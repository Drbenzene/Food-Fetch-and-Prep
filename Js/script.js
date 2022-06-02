const {
  log
} = console

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready
}


function ready() {
  let theButton = document.getElementsByClassName("btn")[0]
  theButton.addEventListener('click', generateRandomFood)

}

async function generateRandomFood(e) {

  let url = "https://www.themealdb.com/api/json/v1/1/random.php"
  await fetch(url)
    .then(response => response.json())
    .then(res => {
      let generatedFood = res.meals[0]
      log(generatedFood)
      createMeal(generatedFood)

    })
    .catch(err => console.error(err))
}



//Working with the Food Fetch From API
function createMeal(food) {

  const ingredients = [];

  for (let i = 0; i < 20; i++) {
    if (food[`strIngredient${i}`]) {
      ingredients.push(`${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}`);
      log(ingredients)
    } else {
      break;
    }

    log(ingredients)
  }

  if (food.strTags == null) {
    food.strTags = ""
  }

  //Parsing Data On The HTML Body

  let container = document.getElementsByClassName("content-con")[0]
  let theContentCon =

    `
    <div class="container food-con">
      <div class="row food-row">
        <div class="col foodItem-col">
          <img class="img-fluid" src="${food.strMealThumb}" alt="">

          <div class="food-props">
            <p style="font-weight: bold">Category: <span>${food.strCategory}</span></p>
            <p style="font-weight: bold">Area: <span>${food.strArea}</span></p>
            <p style="font-weight: bold">Tags: <span>${food.strTags}</span></p>
          </div>

          <div>
            <h2>Ingredients:</h2>
            <div>
              <ul>
                <li>${food.strIngredient1}</li>
                <li>${food.strIngredient2}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col food-prep">
          <h2>${food.strMeal}</h2>
          <p>${food.strInstructions}</p>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="video-div">
          <h2>Video Recipe</h2>

          <iframe width="100%" height="500"
          src="https://www.youtube.com/embed/${food.strYoutube.slice(-11)}">
          </iframe>

        </div>
      </div>
    </div>
`
  container.innerHTML = theContentCon
}