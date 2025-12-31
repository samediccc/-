class App {
    constructor() {
        this.currentEra = 'ancient';
        this.mapEngine = null;
        this.init();
    }
    
    init() {
        this.initMapEngine();
        this.initTimeline();
        this.initStoryPanel();
        this.initEventListeners();
        this.animateIntro();
    }
    
    initMapEngine() {
        this.mapEngine = new MapEngine('map-svg', dataStories);
    }
    
    initTimeline() {
        this.renderTimeline('ancient');
    }
    
    renderTimeline(era) {
        const timeline = document.getElementById('timeline');
        const stories = dataStories[era];
        
        timeline.innerHTML = '';
        
        stories.forEach((story, index) => {
            const item = this.createTimelineItem(story, index);
            timeline.appendChild(item);
        });
    }
    
    createTimelineItem(story, index) {
        const item = document.createElement('div');
        item.className = `timeline-item ${story.id.startsWith('modern') ? 'modern' : ''}`;
        item.style.animationDelay = `${index * 0.1}s`;
        
        const content = document.createElement('div');
        content.className = 'timeline-content';
        
        const headerRow = document.createElement('div');
        headerRow.className = 'timeline-header-row';
        
        const icon = document.createElement('div');
        icon.className = 'timeline-icon';
        icon.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>`;
        
        const year = document.createElement('div');
        year.className = 'timeline-year';
        year.textContent = story.year;
        
        headerRow.appendChild(icon);
        headerRow.appendChild(year);
        
        const title = document.createElement('h4');
        title.className = 'timeline-title';
        title.textContent = story.title;
        
        const description = document.createElement('p');
        description.className = 'timeline-description';
        description.textContent = story.description;
        
        const badge = document.createElement('span');
        badge.className = 'timeline-badge';
        badge.textContent = story.tags[0];
        
        const progress = document.createElement('div');
        progress.className = 'timeline-progress';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'timeline-progress-bar';
        progressBar.style.width = `${story.progress}%`;
        
        progress.appendChild(progressBar);
        
        const tags = document.createElement('div');
        tags.className = 'timeline-tags';
        
        story.tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'timeline-tag';
            tagEl.textContent = tag;
            tags.appendChild(tagEl);
        });
        
        const details = document.createElement('div');
        details.className = 'timeline-details';
        
        Object.entries(story.details).forEach(([key, value]) => {
            const detailItem = document.createElement('div');
            detailItem.className = 'timeline-detail-item';
            
            const label = document.createElement('span');
            label.className = 'timeline-detail-label';
            label.textContent = this.formatDetailLabel(key);
            
            const detailValue = document.createElement('span');
            detailValue.className = 'timeline-detail-value';
            detailValue.textContent = value;
            
            detailItem.appendChild(label);
            detailItem.appendChild(detailValue);
            details.appendChild(detailItem);
        });
        
        const actions = document.createElement('div');
        actions.className = 'timeline-actions';
        
        const viewBtn = document.createElement('button');
        viewBtn.className = 'timeline-action-btn';
        viewBtn.textContent = '查看详情';
        viewBtn.addEventListener('click', () => this.showStoryDetails(story));
        
        actions.appendChild(viewBtn);
        
        content.appendChild(headerRow);
        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(badge);
        content.appendChild(progress);
        content.appendChild(tags);
        content.appendChild(details);
        content.appendChild(actions);
        
        item.appendChild(content);
        
        item.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                this.toggleTimelineItem(item);
            }
        });
        
        return item;
    }
    
    formatDetailLabel(key) {
        const labels = {
            location: '位置',
            dynasty: '朝代',
            period: '时期',
            significance: '意义',
            population: '人口',
            area: '面积',
            distance: '距离',
            duration: '持续时间',
            foreignResidents: '外籍居民',
            leader: '领导者',
            impact: '影响',
            outcome: '结果',
            heritageSites: '遗产点',
            worldHeritage: '世界遗产',
            gdp: 'GDP',
            growthRate: '增长率',
            visitors: '游客量',
            height: '高度',
            length: '长度',
            companies: '企业数量',
            greenCoverage: '绿化覆盖率'
        };
        return labels[key] || key;
    }
    
    toggleTimelineItem(item) {
        const isActive = item.classList.contains('active');
        
        document.querySelectorAll('.timeline-item').forEach(el => {
            el.classList.remove('active');
        });
        
        if (!isActive) {
            item.classList.add('active');
        }
    }
    
    showStoryDetails(story) {
        const infoTitle = document.getElementById('info-title');
        const infoContent = document.getElementById('info-content');
        
        infoTitle.textContent = story.title;
        
        let detailsHtml = `
            <p><strong>年份：</strong>${story.year}</p>
            <p><strong>描述：</strong>${story.description}</p>
            <div style="margin-top: 1rem;">
        `;
        
        Object.entries(story.details).forEach(([key, value]) => {
            detailsHtml += `<p><strong>${this.formatDetailLabel(key)}：</strong>${value}</p>`;
        });
        
        detailsHtml += '</div>';
        
        infoContent.innerHTML = detailsHtml;
        
        infoContent.parentElement.classList.add('animate-slide-in-right');
    }
    
    initStoryPanel() {
        const container = document.getElementById('story-container');
        
        const stories = [
            {
                title: '丝绸之路起点',
                description: '从长安出发，连接东西方文明的伟大贸易通道',
                icon: '🐫',
                color: '#8B4513'
            },
            {
                title: '盛唐气象',
                description: '万国来朝，文化交融，世界级大都市的辉煌',
                icon: '🏛️',
                color: '#FFD700'
            },
            {
                title: '现代西安',
                description: '国家中心城市，国际化大都市的崛起',
                icon: '🏙️',
                color: '#1E90FF'
            },
            {
                title: '文化传承',
                description: '千年古都，文化底蕴深厚，历史与现代交融',
                icon: '📜',
                color: '#D2691E'
            }
        ];
        
        stories.forEach((story, index) => {
            const card = this.createStoryCard(story, index);
            container.appendChild(card);
        });
    }
    
    createStoryCard(story, index) {
        const card = document.createElement('div');
        card.className = 'story-card';
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.innerHTML = `
            <div class="story-card-icon" style="background: ${story.color}">
                ${story.icon}
            </div>
            <h4 class="story-card-title">${story.title}</h4>
            <p class="story-card-description">${story.description}</p>
        `;
        
        card.style.cssText = `
            background: var(--bg-neutral);
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 12px var(--shadow);
            transition: var(--transition);
            cursor: pointer;
            animation: fadeInUp 0.5s ease-out ${index * 0.2}s both;
        `;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 24px var(--shadow)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 12px var(--shadow)';
        });
        
        return card;
    }
    
    initEventListeners() {
        const eraBtns = document.querySelectorAll('.era-btn');
        eraBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const era = btn.dataset.era;
                this.switchEra(era);
            });
        });
        
        const closeBtn = document.getElementById('close-info');
        closeBtn.addEventListener('click', () => {
            const infoPanel = document.querySelector('.info-panel');
            infoPanel.classList.add('animate-fade-out');
            setTimeout(() => {
                infoPanel.classList.remove('animate-fade-out');
                document.getElementById('info-title').textContent = '选择地标查看详情';
                document.getElementById('info-content').innerHTML = '<p>点击地图上的地标，探索西安的历史与文化</p>';
            }, 500);
        });
        
        this.initNavigation();
    }
    
    initNavigation() {
        const navWindow = document.getElementById('nav-content').parentElement;
        const navToggle = document.getElementById('nav-toggle');
        const navOverlay = document.getElementById('nav-overlay');
        const navOpenBtn = document.getElementById('nav-open-btn');
        
        const openNav = () => {
            navWindow.classList.add('open');
            navOverlay.classList.add('active');
        };
        
        const closeNav = () => {
            navWindow.classList.remove('open');
            navOverlay.classList.remove('active');
        };
        
        if (navToggle) {
            navToggle.addEventListener('click', closeNav);
        }
        
        if (navOverlay) {
            navOverlay.addEventListener('click', closeNav);
        }
        
        if (navOpenBtn) {
            navOpenBtn.addEventListener('click', openNav);
        }
        
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const target = item.dataset.target;
                this.navigateToSection(target);
                
                navItems.forEach(el => el.classList.remove('active'));
                item.classList.add('active');
            });
        });
        
        const eraSwitchBtns = document.querySelectorAll('.era-switch-btn');
        eraSwitchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const era = btn.dataset.era;
                this.switchEra(era);
                
                eraSwitchBtns.forEach(el => el.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        const searchInput = document.getElementById('nav-search');
        const searchBtn = document.querySelector('.search-btn');
        
        const performSearch = () => {
            const query = searchInput.value.trim().toLowerCase();
            if (query) {
                this.searchContent(query);
            }
        };
        
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
        
        const fullscreenBtn = document.getElementById('action-fullscreen');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }
        
        const resetBtn = document.getElementById('action-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetView();
            });
        }
        
        const shareBtn = document.getElementById('action-share');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareContent();
            });
        }
        
        const downloadBtn = document.getElementById('action-download');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadContent();
            });
        }
    }
    
    navigateToSection(target) {
        const sections = {
            map: '.map-section',
            timeline: '.timeline-section',
            landmarks: '.map-section',
            stories: '.story-panel'
        };
        
        const selector = sections[target];
        if (selector) {
            const element = document.querySelector(selector);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        
        if (target === 'landmarks' && this.mapEngine) {
            this.mapEngine.highlightLandmarks();
        }
    }
    
    searchContent(query) {
        const allStories = [...dataStories.ancient, ...dataStories.modern];
        const results = allStories.filter(story => 
            story.title.toLowerCase().includes(query) ||
            story.description.toLowerCase().includes(query) ||
            story.tags.some(tag => tag.toLowerCase().includes(query))
        );
        
        const infoTitle = document.getElementById('info-title');
        const infoContent = document.getElementById('info-content');
        
        if (results.length > 0) {
            infoTitle.textContent = `搜索结果 (${results.length})`;
            
            let html = '';
            results.forEach(result => {
                html += `
                    <div style="padding: 1rem; margin-bottom: 1rem; background: #f8f9fa; border-radius: 8px; cursor: pointer;" onclick="window.app.showStoryDetails(dataStories.${result.id.startsWith('modern') ? 'modern' : 'ancient'}.find(s => s.id === '${result.id}'))">
                        <h4 style="margin-bottom: 0.5rem; color: var(--ancient-primary);">${result.title}</h4>
                        <p style="font-size: 0.9rem; color: #666;">${result.year} - ${result.description}</p>
                    </div>
                `;
            });
            
            infoContent.innerHTML = html;
        } else {
            infoTitle.textContent = '搜索结果';
            infoContent.innerHTML = '<p>未找到相关内容</p>';
        }
        
        this.navigateToSection('timeline');
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    resetView() {
        if (this.mapEngine) {
            this.mapEngine.resetView();
        }
        
        this.switchEra('ancient');
        
        document.getElementById('info-title').textContent = '选择地标查看详情';
        document.getElementById('info-content').innerHTML = '<p>点击地图上的地标，探索西安的历史与文化</p>';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    shareContent() {
        const shareData = {
            title: '西安时空地图',
            text: '穿越千年，见证长安与西安的时空对话',
            url: window.location.href
        };
        
        if (navigator.share) {
            navigator.share(shareData).catch(err => {
                console.log('Error sharing:', err);
                this.copyToClipboard(window.location.href);
            });
        } else {
            this.copyToClipboard(window.location.href);
        }
    }
    
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('链接已复制到剪贴板！');
        }).catch(err => {
            console.log('Error copying to clipboard:', err);
            prompt('请复制以下链接：', text);
        });
    }
    
    downloadContent() {
        const svg = document.getElementById('map-svg');
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = '西安时空地图.svg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }
    
    switchEra(era) {
        this.currentEra = era;
        
        const eraBtns = document.querySelectorAll('.era-btn');
        eraBtns.forEach(btn => {
            if (btn.dataset.era === era) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        this.renderTimeline(era);
        
        if (this.mapEngine) {
            this.mapEngine.setEra(era);
        }
    }
    
    animateIntro() {
        const header = document.querySelector('.header');
        const mainContainer = document.querySelector('.main-container');
        
        header.classList.add('animate-slide-in-down');
        
        setTimeout(() => {
            mainContainer.classList.add('animate-fade-in');
        }, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});