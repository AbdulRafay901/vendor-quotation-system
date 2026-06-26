// <! FULLY INTERACTIVE JAVASCRIPT FOR RESPONSIVE TOGGLE ----------- Start

        document.addEventListener('DOMContentLoaded', function() {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
            const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
            const sidebarOverlay = document.getElementById('sidebarOverlay');
            const btn = document.querySelector(".sidebar-toggle-btn");
            const mainContent = document.querySelector(".main-content");
            const navbarJs = document.querySelector(".header");

            btn.addEventListener("click", (() => {
                 mainContent.classList.toggle("main-content-js")
                 navbarJs.classList.toggle("navbar-js")
            }))
            
            function toggleSidebar() {
                const isMobile = window.innerWidth <= 991;
                if (isMobile) {
                    sidebar.classList.toggle('active');
                    sidebarOverlay.classList.toggle('active');

                } else {
                   
                    sidebar.classList.toggle('collapsed');
                }
            }

            
            function closeSidebar() {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            }

            
            sidebarToggleBtn.addEventListener('click', toggleSidebar);
            sidebarCloseBtn.addEventListener('click', closeSidebar);
            sidebarOverlay.addEventListener('click', closeSidebar);

            
            window.addEventListener('resize', function() {
                if (window.innerWidth > 991) {
                    closeSidebar();
                }
            });
        });

// <! FULLY INTERACTIVE JAVASCRIPT FOR RESPONSIVE TOGGLE ----------- End 