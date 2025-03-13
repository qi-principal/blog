document.addEventListener('DOMContentLoaded', function() {
    // 初始化季节主题
    initTheme();
    
    // 添加季节特效
    addSeasonalElements();
    
    // 绑定事件监听
    bindEvents();
    
    // 页面加载时的淡入效果
    fadeInPage();
});

// 初始化主题
function initTheme() {
    const savedTheme = localStorage.getItem('seasonTheme');
    
    if (savedTheme) {
        document.body.className = savedTheme;
        updateActiveSeasonButton(savedTheme);
    } else {
        // 根据当前月份自动设置季节主题
        const currentMonth = new Date().getMonth();
        let theme;
        
        if (currentMonth >= 2 && currentMonth <= 4) {
            // 春季 (3-5月)
            theme = 'theme-spring';
        } else if (currentMonth >= 5 && currentMonth <= 7) {
            // 夏季 (6-8月)
            theme = 'theme-summer';
        } else if (currentMonth >= 8 && currentMonth <= 10) {
            // 秋季 (9-11月)
            theme = 'theme-autumn';
        } else {
            // 冬季 (12-2月)
            theme = 'theme-winter';
        }
        
        document.body.className = theme;
        updateActiveSeasonButton(theme);
        localStorage.setItem('seasonTheme', theme);
    }
}

// 更新激活的季节按钮
function updateActiveSeasonButton(theme) {
    // 移除所有按钮的active类
    document.querySelectorAll('.season-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 根据当前主题添加active类
    let buttonClass;
    switch(theme) {
        case 'theme-spring':
            buttonClass = '.season-spring';
            break;
        case 'theme-summer':
            buttonClass = '.season-summer';
            break;
        case 'theme-autumn':
            buttonClass = '.season-autumn';
            break;
        case 'theme-winter':
            buttonClass = '.season-winter';
            break;
    }
    
    if (buttonClass) {
        const activeButton = document.querySelector(buttonClass);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
}

// 添加季节特效元素
function addSeasonalElements() {
    const currentTheme = document.body.className;
    const container = document.querySelector('.content-wrapper');
    if (!container) return;
    
    // 清除现有的季节元素
    document.querySelectorAll('.seasonal-element').forEach(el => el.remove());
    
    // 根据当前主题添加对应的季节元素
    let elementClass, count;
    
    switch(currentTheme) {
        case 'theme-spring':
            elementClass = 'spring-element';
            count = 10;
            break;
        case 'theme-summer':
            elementClass = 'summer-element';
            count = 6;
            break;
            case 'theme-autumn':
                elementClass = 'autumn-element';
                count = 8;
                break;
            case 'theme-winter':
                elementClass = 'winter-element';
                count = 15;
                break;
            default:
                elementClass = 'spring-element';
                count = 10;
        }
        
        // 创建并添加季节元素
        for (let i = 0; i < count; i++) {
            const element = document.createElement('div');
            element.classList.add('seasonal-element', elementClass);
            
            // 随机位置和动画延迟
            const leftPos = Math.random() * 100;
            const animDelay = Math.random() * 10;
            
            element.style.left = `${leftPos}%`;
            element.style.animationDelay = `${animDelay}s`;
            
            container.appendChild(element);
        }
    }
    
    // 绑定事件
    function bindEvents() {
        // 季节切换按钮
        document.querySelectorAll('.season-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                let theme;
                
                if (this.classList.contains('season-spring')) {
                    theme = 'theme-spring';
                } else if (this.classList.contains('season-summer')) {
                    theme = 'theme-summer';
                } else if (this.classList.contains('season-autumn')) {
                    theme = 'theme-autumn';
                } else if (this.classList.contains('season-winter')) {
                    theme = 'theme-winter';
                }
                
                if (theme) {
                    // 保存到本地存储
                    localStorage.setItem('seasonTheme', theme);
                    
                    // 显示过渡动画
                    showPageTransition(() => {
                        // 更改主题
                        document.body.className = theme;
                        
                        // 更新激活的按钮
                        updateActiveSeasonButton(theme);
                        
                        // 更新季节元素
                        addSeasonalElements();
                        
                        // 隐藏过渡动画
                        hidePageTransition();
                    });
                }
            });
        });
        
        // 项目卡片点击事件
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project-id');
                
                showPageTransition(() => {
                    window.location.href = `project-detail.html?id=${projectId}`;
                });
            });
        });
        
        // 为所有内部链接添加平滑过渡
        document.querySelectorAll('a').forEach(link => {
            // 仅处理内部链接
            if (link.href.startsWith(window.location.origin) || link.href.startsWith('/')) {
                link.addEventListener('click', function(e) {
                    // 如果不是锚点链接
                    if (!this.hash) {
                        e.preventDefault();
                        
                        const targetUrl = this.href;
                        
                        showPageTransition(() => {
                            window.location.href = targetUrl;
                        });
                    }
                });
            }
        });
    }
    
    // 显示页面过渡
    function showPageTransition(callback) {
        const transition = document.querySelector('.page-transition');
        if (!transition) {
            if (callback) callback();
            return;
        }
        
        transition.classList.add('active');
        
        setTimeout(() => {
            if (callback) callback();
        }, 500);
    }
    
    // 隐藏页面过渡
    function hidePageTransition() {
        const transition = document.querySelector('.page-transition');
        if (!transition) return;
        
        setTimeout(() => {
            transition.classList.remove('active');
        }, 300);
    }
    
    // 页面淡入效果
    function fadeInPage() {
        document.body.style.opacity = 0;
        
        setTimeout(() => {
            document.body.style.opacity = 1;
            document.body.style.transition = 'opacity 1s ease';
        }, 100);
    }
    
    // 随机项目风格生成器
    function getRandomStyle() {
        const styles = ['spring-style', 'summer-style', 'autumn-style', 'winter-style'];
        const randomIndex = Math.floor(Math.random() * styles.length);
        return styles[randomIndex];
    }
    
// 项目详情页加载
function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (!projectId) {
        window.location.href = 'projects.html';
        return;
    }
    
    // 这里通常会从API获取项目数据
    // 但为了演示，我们使用硬编码数据
    const projectData = getProjectData(projectId);
    
    if (!projectData) {
        window.location.href = 'projects.html';
        return;
    }
    
    // 填充项目详情
    document.querySelector('.project-title-main').textContent = projectData.title;
    document.querySelector('.project-detail-image').style.backgroundImage = `url(${projectData.image})`;
    document.querySelector('.project-desc-full').textContent = projectData.description;
    document.querySelector('.stat-start').textContent = projectData.startDate;
    document.querySelector('.stat-status').textContent = projectData.status;
    document.querySelector('.progress-fill').style.width = `${projectData.progress}%`;
    document.querySelector('.progress-text').textContent = `${projectData.progress}%`;
    
    // 填充里程碑
    const milestoneList = document.querySelector('.milestone-list');
    projectData.milestones.forEach(milestone => {
        const milestoneEl = document.createElement('div');
        milestoneEl.classList.add('milestone');
        
        milestoneEl.innerHTML = `
            <div class="milestone-date">${milestone.date}</div>
            <div class="milestone-text">${milestone.text}</div>
        `;
        
        milestoneList.appendChild(milestoneEl);
    });
}

// 模拟获取项目数据
function getProjectData(id) {
    const projects = {
        '1': {
            title: '春水晴岚',
            image: 'img/project1.jpg',
            description: '这是一个基于传统山水画法的图像处理工具，旨在将现代照片转化为具有中国传统山水画风格的艺术作品。项目融合了深度学习与传统图像处理技术，通过对大量传统山水画作品的学习，提取其笔触、用墨和构图特点，应用于现代照片处理中。',
            startDate: '2023年3月',
            status: '进行中',
            progress: 85,
            milestones: [
                { date: '2023-03-15', text: '项目立项，完成初步调研' },
                { date: '2023-04-20', text: '算法原型设计完成' },
                { date: '2023-05-30', text: '核心处理引擎开发完成' },
                { date: '2023-06-25', text: '用户界面设计及实现' },
                { date: '2023-07-15', text: '测试版发布' }
            ]
        },
        '2': {
            title: '夏荷水韵',
            image: 'img/project2.jpg',
            description: '一款专注于水墨动画创作的应用程序，以荷塘夏景为灵感，让用户可以创作富有生命力的水墨动画。该项目结合了物理模拟与艺术创作，通过对水的流动、墨的扩散进行精确模拟，同时保留传统水墨画的艺术美感。',
            startDate: '2022年6月',
            status: '已完成',
            progress: 100,
            milestones: [
                { date: '2022-06-10', text: '概念设计与技术可行性研究' },
                { date: '2022-07-22', text: '流体动力学模型构建' },
                { date: '2022-08-15', text: '水墨渲染引擎开发' },
                { date: '2022-09-28', text: '用户创作界面实现' },
                { date: '2022-11-05', text: '项目发布' }
            ]
        },
        '3': {
            title: '秋枫沉思',
            image: 'img/project3.jpg',
            description: '一个数字冥想平台，以秋季落叶为视觉主题，融合了传统东方哲学与现代心理学理念。用户可以在平台上进行引导式冥想，伴随着随季节变化的自然音效和视觉元素，帮助用户达到心灵平静的状态。',
            startDate: '2022年9月',
            status: '已完成',
            progress: 100,
            milestones: [
                { date: '2022-09-01', text: '项目概念形成' },
                { date: '2022-10-12', text: '冥想内容创作' },
                { date: '2022-11-20', text: '音效与视觉设计' },
                { date: '2022-12-15', text: '平台开发完成' },
                { date: '2023-01-10', text: '正式发布' }
            ]
        }
    };
    
    return projects[id];
}