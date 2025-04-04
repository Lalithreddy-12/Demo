document.addEventListener("DOMContentLoaded", function() {
    // Mobile Menu Toggle with Animation
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links li");
    
    hamburger.addEventListener("click", function() {
        // Toggle active class with animation
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("is-active");
        
        // Animate nav items
        if (navLinks.classList.contains("active")) {
            navItems.forEach((item, index) => {
                item.style.animation = `navItemFade 0.5s ease forwards ${index * 0.1 + 0.3}s`;
            });
        } else {
            navItems.forEach(item => {
                item.style.animation = "";
            });
        }
    });

    // Search Functionality with Debounce
    const searchInput = document.querySelector(".search-bar input");
    const collectionCards = document.querySelectorAll(".collection-card");
    
    const debounce = (func, delay) => {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    };
    
    const filterCards = () => {
        const searchText = searchInput.value.trim().toLowerCase();
        let hasResults = false;
        
        collectionCards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const isVisible = title.includes(searchText);
            
            card.style.display = isVisible ? "block" : "none";
            if (isVisible) hasResults = true;
            
            // Add animation class when showing/hiding
            if (isVisible) {
                card.classList.add("fade-in");
                card.classList.remove("fade-out");
            } else {
                card.classList.add("fade-out");
                card.classList.remove("fade-in");
            }
        });
        const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lalithreddy3094:BGLHrnIjRojbDzUK@cluster0.isvdxfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
        // Show "no results" message if needed
        const noResults = document.getElementById("no-results") || 
                         document.createElement("div");
        if (!hasResults && searchText.length > 0) {
            noResults.id = "no-results";
            noResults.textContent = "No matching photography services found";
            noResults.style.textAlign = "center";
            noResults.style.gridColumn = "1 / -1";
            noResults.style.padding = "20px";
            noResults.style.color = "#666";
            
            if (!document.getElementById("no-results")) {
                document.querySelector(".collection-grid").appendChild(noResults);
            }
        } else if (document.getElementById("no-results")) {
            noResults.remove();
        }
    };
    
    searchInput.addEventListener("input", debounce(filterCards, 300));

    // Enhanced Smooth Scrolling
    const links = document.querySelectorAll("nav ul li a[href^='#']");
    
    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href");
            
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Close mobile menu if open
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                hamburger.classList.remove("is-active");
            }
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth"
            });
            
            // Update URL without page reload
            history.pushState(null, null, targetId);
        });
    });

    // Intersection Observer for Scroll Animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                observer.unobserve(entry.target);
            }
        });
    };
    
    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    
    document.querySelectorAll(".collection-card, .photographer-cta, .stat-item").forEach(el => {
        scrollObserver.observe(el);
    });

    // Image Lazy Loading
    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll("img[loading='lazy']");
        lazyImages.forEach(img => {
            img.loading = "lazy";
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll("img[data-src]").forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }

    // Form Submission Handling (if you add forms later)
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", async function(event) {
            event.preventDefault();
            
            const submitButton = form.querySelector("button[type='submit']");
            const originalText = submitButton.textContent;
            
            try {
                submitButton.disabled = true;
                submitButton.textContent = "Processing...";
                
                // Simulate form submission (replace with actual fetch call)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                submitButton.textContent = "Success!";
                form.reset();
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            } catch (error) {
                submitButton.textContent = "Error - Try Again";
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
                console.error("Form submission error:", error);
            }
        });
    });
});