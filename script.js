document.addEventListener('DOMContentLoaded', () => {
    const recipeContainer = document.getElementById('recipeContainer');
    const addRecipeBtn = document.getElementById('addRecipeBtn');
    const addRecipeForm = document.getElementById('addRecipeForm');
    const form = addRecipeForm.querySelector('form');
    const searchInput = document.getElementById('searchInput');
    const categoryButtons = document.querySelectorAll('.category'); // جميع أزرار الفئات
    const showAllBtn = document.getElementById('showAllBtn'); // زر عرض الكل
    let recipes = [];

    addRecipeBtn.addEventListener('click', () => {
        addRecipeForm.classList.toggle('hidden');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = form.querySelector('#title').value;
        const ingredients = form.querySelector('#ingredients').value;
        const steps = form.querySelector('#steps').value;
        const category = form.querySelector('#category').value;

        const newRecipe = { title, ingredients, steps, category };
        recipes.push(newRecipe);
        displayRecipes();
        form.reset();
        addRecipeForm.classList.add('hidden');
    });

    searchInput.addEventListener('input', () => {
        displayRecipes(searchInput.value.toLowerCase());
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.textContent.toLowerCase();
            displayRecipes('', selectedCategory);
        });
    });

    showAllBtn.addEventListener('click', () => {
        displayRecipes(); // عرض جميع الوصفات
    });

    function displayRecipes(searchTerm = '', categoryFilter = '') {
        recipeContainer.innerHTML = '';
        const filteredRecipes = recipes.filter(recipe => {
            const matchesSearch = recipe.title.toLowerCase().includes(searchTerm);
            const matchesCategory = categoryFilter ? recipe.category.toLowerCase() === categoryFilter : true;
            return matchesSearch && matchesCategory;
        });

        filteredRecipes.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `
                <h3>${recipe.title}</h3>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Steps:</strong> ${recipe.steps}</p>
                <p><strong>Category:</strong> ${recipe.category}</p>
            `;
            recipeContainer.appendChild(card);
        });
    }
});
