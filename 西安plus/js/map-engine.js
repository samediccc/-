class MapEngine {
    constructor(svgId, data) {
        this.svg = document.getElementById(svgId);
        this.data = data;
        this.zoom = 1;
        this.pan = { x: 0, y: 0 };
        this.isDragging = false;
        this.lastMouse = { x: 0, y: 0 };
        this.currentEra = 'ancient';
        this.activeLandmark = null;
        
        this.backgroundGroup = document.getElementById('map-background');
        this.routesGroup = document.getElementById('map-routes');
        this.landmarksGroup = document.getElementById('map-landmarks');
        this.labelsGroup = document.getElementById('map-labels');
        
        this.init();
    }
    
    init() {
        this.drawBackground();
        this.drawRoutes();
        this.drawLandmarks();
        this.setupEventListeners();
    }
    
    drawBackground() {
        const { width, height } = this.svg.viewBox.baseVal;
        
        const ancientZone = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        ancientZone.setAttribute('x', '100');
        ancientZone.setAttribute('y', '100');
        ancientZone.setAttribute('width', '300');
        ancientZone.setAttribute('height', '400');
        ancientZone.setAttribute('fill', 'url(#ancientGradient)');
        ancientZone.setAttribute('opacity', '0.3');
        ancientZone.setAttribute('rx', '20');
        
        const modernZone = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        modernZone.setAttribute('x', '400');
        modernZone.setAttribute('y', '100');
        modernZone.setAttribute('width', '300');
        modernZone.setAttribute('height', '400');
        modernZone.setAttribute('fill', 'url(#modernGradient)');
        modernZone.setAttribute('opacity', '0.3');
        modernZone.setAttribute('rx', '20');
        
        const river = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        river.setAttribute('d', 'M 50 500 Q 200 450 400 480 T 750 520');
        river.setAttribute('stroke', '#4FC3F7');
        river.setAttribute('stroke-width', '15');
        river.setAttribute('fill', 'none');
        river.setAttribute('opacity', '0.6');
        
        const cityWall = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        cityWall.setAttribute('x', '250');
        cityWall.setAttribute('y', '200');
        cityWall.setAttribute('width', '300');
        cityWall.setAttribute('height', '250');
        cityWall.setAttribute('stroke', '#8B4513');
        cityWall.setAttribute('stroke-width', '4');
        cityWall.setAttribute('fill', 'none');
        cityWall.setAttribute('stroke-dasharray', '10,5');
        
        const gridLines = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        for (let i = 0; i <= 8; i++) {
            const verticalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            verticalLine.setAttribute('x1', i * 100);
            verticalLine.setAttribute('y1', 0);
            verticalLine.setAttribute('x2', i * 100);
            verticalLine.setAttribute('y2', 600);
            verticalLine.setAttribute('stroke', '#ddd');
            verticalLine.setAttribute('stroke-width', '0.5');
            verticalLine.setAttribute('opacity', '0.3');
            
            const horizontalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            horizontalLine.setAttribute('x1', 0);
            horizontalLine.setAttribute('y1', i * 75);
            horizontalLine.setAttribute('x2', 800);
            horizontalLine.setAttribute('y2', i * 75);
            horizontalLine.setAttribute('stroke', '#ddd');
            horizontalLine.setAttribute('stroke-width', '0.5');
            horizontalLine.setAttribute('opacity', '0.3');
            
            gridLines.appendChild(verticalLine);
            gridLines.appendChild(horizontalLine);
        }
        
        this.backgroundGroup.appendChild(gridLines);
        this.backgroundGroup.appendChild(ancientZone);
        this.backgroundGroup.appendChild(modernZone);
        this.backgroundGroup.appendChild(river);
        this.backgroundGroup.appendChild(cityWall);
    }
    
    drawRoutes() {
        this.data.routes.forEach(route => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const d = this.createPathData(route.path);
            path.setAttribute('d', d);
            path.setAttribute('stroke', route.type === 'ancient' ? '#8B4513' : '#1E90FF');
            path.setAttribute('stroke-width', '3');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-dasharray', '10,5');
            path.setAttribute('opacity', '0.7');
            path.setAttribute('class', 'route-path');
            path.setAttribute('data-route-id', route.id);
            path.style.cursor = 'pointer';
            
            path.addEventListener('mouseenter', () => {
                path.setAttribute('stroke-width', '5');
                path.setAttribute('opacity', '1');
                path.style.filter = 'url(#glow)';
            });
            
            path.addEventListener('mouseleave', () => {
                path.setAttribute('stroke-width', '3');
                path.setAttribute('opacity', '0.7');
                path.style.filter = 'none';
            });
            
            path.addEventListener('click', () => {
                this.showRouteInfo(route);
            });
            
            this.routesGroup.appendChild(path);
        });
    }
    
    createPathData(points) {
        if (points.length < 2) return '';
        
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            d += ` L ${points[i].x} ${points[i].y}`;
        }
        return d;
    }
    
    drawLandmarks() {
        this.data.landmarks.forEach(landmark => {
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.setAttribute('class', 'landmark-group');
            group.setAttribute('data-landmark-id', landmark.id);
            group.style.cursor = 'pointer';
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', landmark.position.x);
            circle.setAttribute('cy', landmark.position.y);
            circle.setAttribute('r', landmark.type === 'ancient' ? '15' : '12');
            circle.setAttribute('fill', landmark.type === 'ancient' ? '#8B4513' : '#1E90FF');
            circle.setAttribute('stroke', landmark.type === 'ancient' ? '#FFD700' : '#00CED1');
            circle.setAttribute('stroke-width', '3');
            circle.setAttribute('class', 'landmark-circle');
            
            const pulseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pulseCircle.setAttribute('cx', landmark.position.x);
            pulseCircle.setAttribute('cy', landmark.position.y);
            pulseCircle.setAttribute('r', '20');
            pulseCircle.setAttribute('fill', 'none');
            pulseCircle.setAttribute('stroke', landmark.type === 'ancient' ? '#FFD700' : '#00CED1');
            pulseCircle.setAttribute('stroke-width', '2');
            pulseCircle.setAttribute('opacity', '0.5');
            pulseCircle.setAttribute('class', 'landmark-pulse');
            pulseCircle.style.animation = 'pulse 2s infinite';
            
            const icon = this.createLandmarkIcon(landmark);
            icon.setAttribute('x', landmark.position.x - 10);
            icon.setAttribute('y', landmark.position.y - 10);
            icon.setAttribute('width', '20');
            icon.setAttribute('height', '20');
            icon.setAttribute('fill', '#fff');
            
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', landmark.position.x);
            label.setAttribute('y', landmark.position.y + 35);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('font-size', '12');
            label.setAttribute('fill', '#2C3E50');
            label.setAttribute('font-weight', 'bold');
            label.textContent = landmark.name;
            label.setAttribute('class', 'landmark-label');
            
            group.appendChild(pulseCircle);
            group.appendChild(circle);
            group.appendChild(icon);
            group.appendChild(label);
            
            group.addEventListener('mouseenter', () => {
                circle.setAttribute('r', '20');
                circle.style.filter = 'url(#glow)';
                label.setAttribute('font-size', '14');
            });
            
            group.addEventListener('mouseleave', () => {
                if (this.activeLandmark !== landmark.id) {
                    circle.setAttribute('r', landmark.type === 'ancient' ? '15' : '12');
                    circle.style.filter = 'none';
                    label.setAttribute('font-size', '12');
                }
            });
            
            group.addEventListener('click', () => {
                this.selectLandmark(landmark);
            });
            
            this.landmarksGroup.appendChild(group);
        });
    }
    
    createLandmarkIcon(landmark) {
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('viewBox', '0 0 24 24');
        
        let path;
        if (landmark.type === 'ancient') {
            path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M12 2L2 22h20L12 2zm0 4l6 14H6l6-14z');
        } else {
            path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z');
        }
        
        icon.appendChild(path);
        return icon;
    }
    
    selectLandmark(landmark) {
        this.activeLandmark = landmark.id;
        
        document.querySelectorAll('.landmark-circle').forEach(circle => {
            circle.setAttribute('r', '15');
            circle.style.filter = 'none';
        });
        
        const selectedGroup = document.querySelector(`[data-landmark-id="${landmark.id}"]`);
        if (selectedGroup) {
            const circle = selectedGroup.querySelector('.landmark-circle');
            circle.setAttribute('r', '25');
            circle.style.filter = 'url(#glow)';
        }
        
        this.showLandmarkInfo(landmark);
    }
    
    showLandmarkInfo(landmark) {
        const infoTitle = document.getElementById('info-title');
        const infoContent = document.getElementById('info-content');
        
        infoTitle.textContent = landmark.name;
        infoContent.innerHTML = `
            <p><strong>类型：</strong>${landmark.type === 'ancient' ? '古代长安' : '现代西安'}</p>
            <p><strong>年代：</strong>${landmark.year}</p>
            <p><strong>描述：</strong>${landmark.description}</p>
            ${landmark.visitors ? `<p><strong>游客量：</strong>${landmark.visitors}</p>` : ''}
            ${landmark.height ? `<p><strong>高度：</strong>${landmark.height}</p>` : ''}
            ${landmark.length ? `<p><strong>长度：</strong>${landmark.length}</p>` : ''}
            ${landmark.area ? `<p><strong>面积：</strong>${landmark.area}</p>` : ''}
            ${landmark.companies ? `<p><strong>企业数量：</strong>${landmark.companies}</p>` : ''}
            ${landmark.greenCoverage ? `<p><strong>绿化覆盖率：</strong>${landmark.greenCoverage}</p>` : ''}
        `;
        
        infoContent.parentElement.classList.add('animate-slide-in-right');
    }
    
    showRouteInfo(route) {
        const infoTitle = document.getElementById('info-title');
        const infoContent = document.getElementById('info-content');
        
        infoTitle.textContent = route.name;
        infoContent.innerHTML = `
            <p><strong>类型：</strong>${route.type === 'ancient' ? '古代长安' : '现代西安'}</p>
            <p><strong>描述：</strong>${route.description}</p>
        `;
        
        infoContent.parentElement.classList.add('animate-slide-in-right');
    }
    
    setupEventListeners() {
        this.svg.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.svg.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.svg.addEventListener('mouseup', () => this.onMouseUp());
        this.svg.addEventListener('mouseleave', () => this.onMouseUp());
        this.svg.addEventListener('wheel', (e) => this.onWheel(e));
        
        document.getElementById('zoom-in').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoom-out').addEventListener('click', () => this.zoomOut());
        document.getElementById('reset-view').addEventListener('click', () => this.resetView());
    }
    
    onMouseDown(e) {
        this.isDragging = true;
        this.lastMouse = { x: e.clientX, y: e.clientY };
        this.svg.style.cursor = 'grabbing';
    }
    
    onMouseMove(e) {
        if (!this.isDragging) return;
        
        const dx = e.clientX - this.lastMouse.x;
        const dy = e.clientY - this.lastMouse.y;
        
        this.pan.x += dx;
        this.pan.y += dy;
        
        this.lastMouse = { x: e.clientX, y: e.clientY };
        this.updateTransform();
    }
    
    onMouseUp() {
        this.isDragging = false;
        this.svg.style.cursor = 'grab';
    }
    
    onWheel(e) {
        e.preventDefault();
        
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        this.zoom = Math.max(0.5, Math.min(3, this.zoom + delta));
        
        this.updateTransform();
    }
    
    zoomIn() {
        this.zoom = Math.min(3, this.zoom + 0.2);
        this.updateTransform();
    }
    
    zoomOut() {
        this.zoom = Math.max(0.5, this.zoom - 0.2);
        this.updateTransform();
    }
    
    resetView() {
        this.zoom = 1;
        this.pan = { x: 0, y: 0 };
        this.updateTransform();
    }
    
    updateTransform() {
        const transform = `translate(${this.pan.x}px, ${this.pan.y}px) scale(${this.zoom})`;
        this.backgroundGroup.style.transform = transform;
        this.backgroundGroup.style.transformOrigin = 'center center';
        this.routesGroup.style.transform = transform;
        this.routesGroup.style.transformOrigin = 'center center';
        this.landmarksGroup.style.transform = transform;
        this.landmarksGroup.style.transformOrigin = 'center center';
        this.labelsGroup.style.transform = transform;
        this.labelsGroup.style.transformOrigin = 'center center';
    }
    
    setEra(era) {
        this.currentEra = era;
        
        const ancientLandmarks = document.querySelectorAll('.landmark-group[data-landmark-id^="landmark-1"], .landmark-group[data-landmark-id^="landmark-2"], .landmark-group[data-landmark-id^="landmark-3"], .landmark-group[data-landmark-id^="landmark-4"]');
        const modernLandmarks = document.querySelectorAll('.landmark-group[data-landmark-id^="landmark-5"], .landmark-group[data-landmark-id^="landmark-6"], .landmark-group[data-landmark-id^="landmark-7"], .landmark-group[data-landmark-id^="landmark-8"]');
        
        const ancientRoutes = document.querySelectorAll('.route-path[data-route-id^="route-1"], .route-path[data-route-id^="route-2"]');
        const modernRoutes = document.querySelectorAll('.route-path[data-route-id^="route-3"], .route-path[data-route-id^="route-4"]');
        
        if (era === 'ancient') {
            ancientLandmarks.forEach(el => el.style.opacity = '1');
            modernLandmarks.forEach(el => el.style.opacity = '0.3');
            ancientRoutes.forEach(el => el.style.opacity = '1');
            modernRoutes.forEach(el => el.style.opacity = '0.3');
        } else {
            ancientLandmarks.forEach(el => el.style.opacity = '0.3');
            modernLandmarks.forEach(el => el.style.opacity = '1');
            ancientRoutes.forEach(el => el.style.opacity = '0.3');
            modernRoutes.forEach(el => el.style.opacity = '1');
        }
    }
    
    highlightLandmarks() {
        const landmarks = document.querySelectorAll('.landmark-group');
        
        landmarks.forEach((landmark, index) => {
            const circle = landmark.querySelector('.landmark-circle');
            const pulse = landmark.querySelector('.landmark-pulse');
            
            setTimeout(() => {
                circle.style.transition = 'all 0.3s ease';
                circle.setAttribute('r', '25');
                circle.style.filter = 'url(#glow)';
                
                setTimeout(() => {
                    circle.setAttribute('r', '15');
                    circle.style.filter = 'none';
                }, 500);
            }, index * 100);
        });
    }
}