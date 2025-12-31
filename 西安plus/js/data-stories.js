const dataStories = {
    ancient: [
        {
            id: 'ancient-1',
            year: '公元前202年',
            title: '长安城建立',
            description: '汉高祖刘邦定都长安，开启了中国历史上第一个大一统王朝的都城时代。',
            details: {
                location: '长安城',
                dynasty: '西汉',
                significance: '中国历史上第一个大一统王朝的都城',
                population: '约50万人',
                area: '约36平方公里'
            },
            tags: ['西汉', '都城', '历史'],
            progress: 100
        },
        {
            id: 'ancient-2',
            year: '公元前138年',
            title: '张骞出使西域',
            description: '张骞奉汉武帝之命出使西域，开辟了举世闻名的丝绸之路。',
            details: {
                location: '长安',
                dynasty: '西汉',
                significance: '开辟丝绸之路，促进东西方文化交流',
                distance: '约1万公里',
                duration: '13年'
            },
            tags: ['丝绸之路', '外交', '文化交流'],
            progress: 85
        },
        {
            id: 'ancient-3',
            year: '公元582年',
            title: '隋文帝建大兴城',
            description: '隋文帝杨坚在汉长安城东南修建大兴城，为后来的唐长安城奠定基础。',
            details: {
                location: '大兴城（今西安）',
                dynasty: '隋朝',
                significance: '唐长安城的前身，城市规划的典范',
                population: '约100万人',
                area: '约84平方公里'
            },
            tags: ['隋朝', '城市规划', '大兴城'],
            progress: 70
        },
        {
            id: 'ancient-4',
            year: '公元618年',
            title: '唐朝建立',
            description: '李渊建立唐朝，定都长安，开启了中国历史上最辉煌的时代。',
            details: {
                location: '长安',
                dynasty: '唐朝',
                significance: '中国历史上最辉煌的时代，世界性大都市',
                population: '约200万人',
                area: '约84平方公里'
            },
            tags: ['唐朝', '盛世', '国际化'],
            progress: 100
        },
        {
            id: 'ancient-5',
            year: '公元713-741年',
            title: '开元盛世',
            description: '唐玄宗李隆基统治期间，长安城达到鼎盛，成为当时世界上最大的城市。',
            details: {
                location: '长安',
                dynasty: '唐朝',
                significance: '唐朝最鼎盛时期，万国来朝',
                population: '约200万人',
                foreignResidents: '约10万人'
            },
            tags: ['盛世', '开元', '国际化'],
            progress: 95
        },
        {
            id: 'ancient-6',
            year: '公元755年',
            title: '安史之乱',
            description: '安禄山发动叛乱，长安城遭受重创，唐朝由盛转衰。',
            details: {
                location: '长安',
                dynasty: '唐朝',
                significance: '唐朝由盛转衰的转折点',
                duration: '8年',
                impact: '人口锐减，经济衰退'
            },
            tags: ['战争', '转折点', '历史'],
            progress: 40
        }
    ],
    modern: [
        {
            id: 'modern-1',
            year: '1911年',
            title: '辛亥革命',
            description: '辛亥革命爆发，西安响应武昌起义，推翻清朝统治。',
            details: {
                location: '西安',
                period: '民国初期',
                significance: '推翻封建帝制，建立共和',
                leader: '张凤翙',
                impact: '陕西光复'
            },
            tags: ['革命', '民国', '历史'],
            progress: 60
        },
        {
            id: 'modern-2',
            year: '1936年',
            title: '西安事变',
            description: '张学良、杨虎城发动兵谏，促成国共合作抗日。',
            details: {
                location: '西安',
                period: '抗日战争前夕',
                significance: '促成国共第二次合作，共同抗日',
                participants: '张学良、杨虎城',
                outcome: '抗日民族统一战线形成'
            },
            tags: ['历史', '抗日', '国共合作'],
            progress: 80
        },
        {
            id: 'modern-3',
            year: '1954年',
            title: '西安成为省会',
            description: '西安成为陕西省省会，开始现代化城市建设。',
            details: {
                location: '西安',
                period: '新中国成立初期',
                significance: '现代化城市建设开始',
                population: '约100万人',
                area: '约200平方公里'
            },
            tags: ['现代化', '城市建设', '发展'],
            progress: 50
        },
        {
            id: 'modern-4',
            year: '1984年',
            title: '成为历史文化名城',
            description: '西安被国务院公布为第一批国家历史文化名城。',
            details: {
                location: '西安',
                period: '改革开放初期',
                significance: '保护历史文化遗产',
                heritageSites: '300多处',
                worldHeritage: '6处'
            },
            tags: ['文化遗产', '保护', '历史'],
            progress: 70
        },
        {
            id: 'modern-5',
            year: '2000年',
            title: '西部大开发',
            description: '西部大开发战略实施，西安迎来新的发展机遇。',
            details: {
                location: '西安',
                period: '21世纪初',
                significance: '西部大开发的重要中心城市',
                gdp: '约1000亿元',
                growthRate: '12%'
            },
            tags: ['发展', '经济', '西部大开发'],
            progress: 65
        },
        {
            id: 'modern-6',
            year: '2024年',
            title: '国际化大都市',
            description: '西安建设国家中心城市和国际化大都市，成为丝绸之路经济带新起点。',
            details: {
                location: '西安',
                period: '新时代',
                significance: '国家中心城市，国际化大都市',
                population: '约1300万人',
                gdp: '约1.2万亿元'
            },
            tags: ['国际化', '发展', '未来'],
            progress: 90
        }
    ],
    landmarks: [
        {
            id: 'landmark-1',
            name: '兵马俑',
            type: 'ancient',
            position: { x: 680, y: 400 },
            description: '秦始皇陵兵马俑，被誉为"世界第八大奇迹"。',
            year: '公元前210年',
            visitors: '每年约800万人次'
        },
        {
            id: 'landmark-2',
            name: '大雁塔',
            type: 'ancient',
            position: { x: 400, y: 420 },
            description: '唐代佛教建筑，玄奘法师译经之地。',
            year: '公元652年',
            height: '64.5米'
        },
        {
            id: 'landmark-3',
            name: '钟楼',
            type: 'ancient',
            position: { x: 400, y: 280 },
            description: '明代建筑，西安的标志性建筑之一。',
            year: '公元1384年',
            height: '36米'
        },
        {
            id: 'landmark-4',
            name: '城墙',
            type: 'ancient',
            position: { x: 400, y: 280 },
            description: '中国现存规模最大、保存最完整的古代城垣。',
            year: '公元1370年',
            length: '13.74公里'
        },
        {
            id: 'landmark-5',
            name: '大唐不夜城',
            type: 'modern',
            position: { x: 420, y: 450 },
            description: '现代仿唐建筑群，展示盛唐文化。',
            year: '2009年',
            area: '约65万平方米'
        },
        {
            id: 'landmark-6',
            name: '高新区',
            type: 'modern',
            position: { x: 250, y: 380 },
            description: '国家级高新技术产业开发区，科技创新高地。',
            year: '1991年',
            companies: '超过30000家'
        },
        {
            id: 'landmark-7',
            name: '曲江新区',
            type: 'modern',
            position: { x: 500, y: 450 },
            description: '文化旅游示范区，展示西安现代文化魅力。',
            year: '1993年',
            area: '约40.97平方公里'
        },
        {
            id: 'landmark-8',
            name: '浐灞生态区',
            type: 'modern',
            position: { x: 580, y: 280 },
            description: '国家级生态示范区，绿色发展典范。',
            year: '2004年',
            greenCoverage: '超过60%'
        }
    ],
    routes: [
        {
            id: 'route-1',
            name: '丝绸之路起点',
            type: 'ancient',
            path: [
                { x: 400, y: 280 },
                { x: 490, y: 280 },
                { x: 580, y: 280 },
                { x: 630, y: 340 },
                { x: 680, y: 400 }
            ],
            description: '从钟楼出发，通往兵马俑的丝绸之路起点'
        },
        {
            id: 'route-2',
            name: '唐长安城中轴线',
            type: 'ancient',
            path: [
                { x: 400, y: 280 },
                { x: 400, y: 350 },
                { x: 400, y: 420 },
                { x: 420, y: 450 }
            ],
            description: '从钟楼到大雁塔、大唐不夜城的南北中轴线'
        },
        {
            id: 'route-3',
            name: '现代地铁线路',
            type: 'modern',
            path: [
                { x: 250, y: 380 },
                { x: 325, y: 330 },
                { x: 400, y: 280 },
                { x: 490, y: 280 },
                { x: 580, y: 280 }
            ],
            description: '连接高新区、钟楼、浐灞生态区的现代交通线'
        },
        {
            id: 'route-4',
            name: '文化旅游环线',
            type: 'modern',
            path: [
                { x: 400, y: 420 },
                { x: 420, y: 450 },
                { x: 500, y: 450 },
                { x: 680, y: 400 },
                { x: 580, y: 280 },
                { x: 400, y: 280 },
                { x: 400, y: 420 }
            ],
            description: '连接大雁塔、大唐不夜城、曲江新区、兵马俑、浐灞生态区、钟楼的文化旅游环线'
        }
    ]
};