const formatDate = (date) => { 
    const DateTime = luxon.DateTime;
    const dt = DateTime.fromISO(date);
    return dt.toLocaleString(DateTime.DATE_MED);
}
const loadReviews = () => {
	const { reviews } = window;
	const container = document.querySelector('.feedback__container');
	container.innerHTML = '';
	reviews.forEach((review) => {
		const reviewElement = document.createElement('div');
		const nameEle = document.createElement('h3');
		const starsEle = document.createElement('div');
		const dateEle = document.createElement('span');
		const contentEle = document.createElement('p');
		nameEle.innerText = review.name;
		dateEle.innerText = formatDate(review.date);
		contentEle.innerText = review.content;
		starsEle.classList.add('stars');
        starsEle.innerHTML = new Array(5).fill(0).map((_, index) => {
            console.log(index, review.rating);
			if (index < review.rating)
				return `
                <svg viewBox="0 0 32 32">
                <g>
                    <path
                        fill="#ffcb2b"
                        d="M29.889 12.472a2.013 2.013 0 0 0-1.6-1.366l-7.187-1.103-3.221-6.834a1.984 1.984 0 0 0-1.807-1.168c-.778 0-1.471.448-1.807 1.166l-3.222 6.837-7.187 1.103a2.016 2.016 0 0 0-1.6 1.366 2.09 2.09 0 0 0 .477 2.13l5.23 5.382-1.236 7.612c-.13.802.194 1.584.847 2.043a1.961 1.961 0 0 0 2.085.111l6.396-3.568 6.431 3.568a1.95 1.95 0 0 0 2.084-.111 2.066 2.066 0 0 0 .847-2.042l-1.236-7.612 5.23-5.382a2.09 2.09 0 0 0 .477-2.13z"
                        data-original="#ffcb2b"
                        class=""
                    ></path>
                </g>
            </svg>
                `;
			return `
            <svg viewBox="0 0 32 32">
            <g>
                <path
                    stroke="#ffcb2b"
                    fill="none"
                    stroke-width="2"
                    d="M29.889 12.472a2.013 2.013 0 0 0-1.6-1.366l-7.187-1.103-3.221-6.834a1.984 1.984 0 0 0-1.807-1.168c-.778 0-1.471.448-1.807 1.166l-3.222 6.837-7.187 1.103a2.016 2.016 0 0 0-1.6 1.366 2.09 2.09 0 0 0 .477 2.13l5.23 5.382-1.236 7.612c-.13.802.194 1.584.847 2.043a1.961 1.961 0 0 0 2.085.111l6.396-3.568 6.431 3.568a1.95 1.95 0 0 0 2.084-.111 2.066 2.066 0 0 0 .847-2.042l-1.236-7.612 5.23-5.382a2.09 2.09 0 0 0 .477-2.13z"
                    data-original="#ffcb2b"
                    class=""
                ></path>
            </g>
        </svg>
            `;
        }).join('');
        reviewElement.classList.add('feedback');
        reviewElement.appendChild(nameEle);
        reviewElement.appendChild(starsEle);
        reviewElement.appendChild(dateEle);
        reviewElement.appendChild(contentEle);
        container.appendChild(reviewElement);
        
	});
};

loadReviews();

const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
	const name = document.getElementById('name').value;
	const content = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    const errorEle = document.querySelector('.error');
	if (!name || !content || !rating) {
        errorEle.innerText = 'Please fill all the fields';
		return;
	}
	const { reviews } = window;
	const newReview = {
		name,
		content,
        rating,
        date: `${new Date().toISOString()}`
	};
    reviews.push(newReview);
    document.getElementById('name').value = '';
    document.getElementById('review').value = 'Your Review';
    document.getElementById('rating').value = '1';
    errorEle.innerText = '';
	loadReviews();
});



