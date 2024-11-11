//Sidebar
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");

    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

});


document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.getElementById("cardscontainer");
    // Getting articles
    fetch("Articles.json")
        .then(response => response.json())
        .then(data => {
            let articles = data.articles;
            displayArticles(articles);



            // Sort by popularity button
            document.getElementById("sortbypop").addEventListener('click', function() {
                const sortedArticles = sortArticlesByViews(articles); 
                displayArticles(sortedArticles);
            });
            function sortArticlesByViews(articles) {
                return articles.sort((a, b) => b.views - a.views); 
            }



            // Sort by dare button
            document.getElementById("sortbydate").addEventListener('click', function() {
                const sortedArticles = sortArticlesByDate(articles);
                displayArticles(sortedArticles);
            });
            function sortArticlesByDate(articles) {
                return articles.sort((a, b) => new Date(b.date) - new Date(a.date)); 
            }


            // Top navigation buttons
            document.getElementById('AI').addEventListener('click', function() { filterArticlesByCategory('AI'); });
            document.getElementById('Kazakhstan').addEventListener('click', function() {filterArticlesByCategory('Kazakhstan');});
            document.getElementById('technology').addEventListener('click', function() {filterArticlesByCategory('Technology'); });
            document.getElementById('politics').addEventListener('click', function() { filterArticlesByCategory('Politics'); });

            function filterArticlesByCategory(category) {
                const filteredArticles = articles.filter(article => article.category === category);
                displayArticles(filteredArticles);
            }


            // Display articles
            function displayArticles(articles) {
                cardsContainer.innerHTML = '';
                articles.forEach(article => {
                    const articleCard = createArticleCard(article);
                    cardsContainer.appendChild(articleCard);
                });
            }


            // Search button
            document.getElementById('search-button').addEventListener('click', function() {
                const searchText = document.getElementById('search-text').value.toLowerCase();
                searchArticles(searchText);
            });

            function searchArticles(searchText) {
                const filteredArticles = articles.filter(article => 
                    article.title.toLowerCase().includes(searchText)
                );
                displayArticles(filteredArticles); 
            }


            // Calculating reading time
            function calculateReadingTime(wordCount) {
                const wordsPerMinute = 200;
                const readingTime = Math.ceil(wordCount / wordsPerMinute); // Round up to the nearest minute
                return readingTime;
            }

            
            // Function to create card
            function createArticleCard(article) {
                const card = document.createElement("div");
                card.classList.add("card");

                const readingTime = calculateReadingTime(article.wordCount);
            
                card.innerHTML = `
                    <div class="card-header">
                        <img src="images/iStock_News.jpg" />
                    </div>
                    <div class="card-content">
                        <h3>${article.title}</h3>
                        <h6 class="news-source">${article.category} | ${article.date}</h6>
                        <p>${article.content}</p>
                        <p><strong>Views:</strong> ${article.views}</p>
                        <p><strong>Reading Time:</strong> ${readingTime} min read</p>
                    </div>
                `;
                
                return card;
            }
            
        })
});