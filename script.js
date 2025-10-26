document.addEventListener("DOMContentLoaded", () => {

  const reviewForm = document.getElementById('reviewForm');
  const searchForm = document.getElementById('searchForm');


  reviewForm.addEventListener('submit', handleFormSubmit);
  searchForm.addEventListener('submit', handleSearchSubmit);


});

async function handleFormSubmit(event) {
    event.preventDefault();
  
    const data = {
      companyName: event.target.name.value,
      pros: event.target.pros.value,
      cons: event.target.cons.value,
      stars: event.target.rating.value
    };
  
    try {
        await axios.post('http://localhost:3000/reviews', data)
        .then(response => {
            console.log(response.data);})
        .catch(err=>{console.log(err);}) 
    } catch(error){
      console.log(error);
    }
    document.getElementById('reviewForm').reset();

  }
  async function handleSearchSubmit(event) {
    event.preventDefault();
  
    const data = {
      name: event.target.comName.value
    };
  
    try {
        await axios.get(`http://localhost:3000/reviews?name=${data.name}`)
        .then(response => {
            displayReviews(response.data);})
        .catch(err=>{console.log(err);})

    } catch(error){
      console.log(error);
    }
  }

  async function displayReviews(reviews) {
    const mainDiv = document.getElementById('searchResults');
    const reviewList = document.getElementById('reviewList');
    const compHeading = document.createElement('h2');
    const rating = document.createElement('h3');

    mainDiv.innerHTML = '';
    reviewList.innerHTML = '';

    if (reviews.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No reviews found for this company.';
        reviewList.appendChild(li);
        mainDiv.appendChild(reviewList);
        return;
    }

    try {
        const response = await axios.get(`http://localhost:3000/reviews/avg?name=${reviews[0].companyName}`);
        console.log(response);
        
        const avg = response.data[0].avgStars;

        rating.textContent = `Average rating: ${Number(avg).toFixed(1)}`;
        compHeading.textContent = reviews[0].companyName;

        mainDiv.appendChild(compHeading);
        mainDiv.appendChild(rating);

    } catch (error) {
        console.error('Error fetching average rating:', error);
        rating.textContent = 'Average rating: Not available';
        mainDiv.appendChild(rating);
    }

    reviews.forEach(review => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Pros:</strong> ${review.pros}<br><strong>Cons:</strong> ${review.cons}<br><strong>Stars:</strong> ${review.stars}`;
        reviewList.appendChild(li);
    });

    mainDiv.appendChild(reviewList);
}



