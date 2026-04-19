// PDF.js Viewer Implementation
const pdfURL = 'FSRL20260408_62.pdf';
const pdfjsLib = window['pdfjs-dist/build/pdf'];

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

class PDFViewer {
    constructor(canvasId, pageNum) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.pageNum = pageNum;
        this.pdf = null;
        this.page = null;
        
        // State for zoom/pan
        this.state = {
            s: 1.0,  // scale
            tx: 0,   // translate x
            ty: 0,   // translate y
            minS: 0.5,
            maxS: 5.0
        };

        this.init();
    }

    async init() {
        try {
            let loadingTask;
            if (typeof pdfData !== 'undefined') {
                const pdfDataBinary = atob(pdfData);
                const uint8Array = new Uint8Array(pdfDataBinary.length);
                for (let i = 0; i < pdfDataBinary.length; i++) {
                    uint8Array[i] = pdfDataBinary.charCodeAt(i);
                }
                loadingTask = pdfjsLib.getDocument({ data: uint8Array });
            } else {
                loadingTask = pdfjsLib.getDocument(pdfURL);
            }
            this.pdf = await loadingTask.promise;
            this.page = await this.pdf.getPage(this.pageNum);
            this.render();
            this.setupInteractions();
        } catch (err) {
            console.error('Error loading PDF:', err);
            this.ctx.font = '20px Georgia';
            this.ctx.fillStyle = '#6B6868';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Could not load PDF document.', this.canvas.width / 2, this.canvas.height / 2);
        }
    }

    render() {
        const viewport = this.page.getViewport({ scale: 1.5 });
        this.canvas.width = viewport.width;
        this.canvas.height = viewport.height;

        const renderContext = {
            canvasContext: this.ctx,
            viewport: viewport
        };
        
        this.page.render(renderContext).promise.then(() => {
            this.applyTransform();
        });
    }

    applyTransform() {
        this.canvas.style.transform = `translate(${this.state.tx}px, ${this.state.ty}px) scale(${this.state.s})`;
        this.canvas.style.transformOrigin = 'center';
    }

    setupInteractions() {
        const container = this.canvas.parentElement;

        // Zoom toward cursor position
        container.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                
                const rect = container.getBoundingClientRect();
                // Cursor position relative to center of container
                const rx = e.clientX - (rect.left + rect.width / 2);
                const ry = e.clientY - (rect.top + rect.height / 2);

                const s_old = this.state.s;
                const delta = -e.deltaY * 0.001;
                const s_new = Math.min(Math.max(this.state.s * (1 + delta), this.state.minS), this.state.maxS);

                if (s_new !== s_old) {
                    // Formula: tx_new = rx - s_new*(rx - tx_old)/s_old
                    this.state.tx = rx - s_new * (rx - this.state.tx) / s_old;
                    this.state.ty = ry - s_new * (ry - this.state.ty) / s_old;
                    this.state.s = s_new;
                    this.applyTransform();
                }
            }
        }, { passive: false });

        // Pan logic
        let isDragging = false;
        let startX, startY;

        container.addEventListener('mousedown', (e) => {
            if (this.state.s > 1) {
                isDragging = true;
                startX = e.clientX - this.state.tx;
                startY = e.clientY - this.state.ty;
                this.canvas.style.cursor = 'grabbing';
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                this.state.tx = e.clientX - startX;
                this.state.ty = e.clientY - startY;
                this.applyTransform();
            }
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            this.canvas.style.cursor = 'grab';
        });

        // Double click to reset
        container.addEventListener('dblclick', () => {
            this.state.s = 1.0;
            this.state.tx = 0;
            this.state.ty = 0;
            this.applyTransform();
        });

        // Simple Pinch Zoom for touch (simplified)
        let lastDist = 0;
        container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                lastDist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
            }
        });

        container.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const dist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
                const midX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
                const midY = (e.touches[0].pageY + e.touches[1].pageY) / 2;
                
                const rect = container.getBoundingClientRect();
                const rx = midX - (rect.left + rect.width / 2);
                const ry = midY - (rect.top + rect.height / 2);

                const s_old = this.state.s;
                const s_new = Math.min(Math.max(this.state.s * (dist / lastDist), this.state.minS), this.state.maxS);

                this.state.tx = rx - s_new * (rx - this.state.tx) / s_old;
                this.state.ty = ry - s_new * (ry - this.state.ty) / s_old;
                this.state.s = s_new;
                
                lastDist = dist;
                this.applyTransform();
            }
        }, { passive: false });
    }
}

// Initialize viewers for both pages when content is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('pdf-canvas')) {
        new PDFViewer('pdf-canvas', 1);
    }
    if (document.getElementById('pdf-canvas-2')) {
        new PDFViewer('pdf-canvas-2', 2);
    }
});
