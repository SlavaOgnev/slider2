const info = [
    {
        img: "img/1.jpg",
        city: 'Rostov-on-Don </br> LCD admiral',
        apartmentArea: '81 m2',
        repair_time: '3.5 months',
        repairCost: 'Upon request'
    },
    {
        img: "img/2.jpg",
        city: 'Sochi Thieves',
        apartmentArea: '105 m2',
        repair_time: '4 months',
        repairCost: 'Upon request'
    },
    {
        img: "img/3.jpg",
        city: 'Rostov-on-Don </br> Patriot',
        apartmentArea: '93 m2',
        repair_time: '3 months',
        repairCost: 'Upon request'
    },
    // {
    //     img: "img/4.jpeg",
    //     city: 'Sukaaaaa',
    //     apartmentArea: '37 m2',
    //     repair_time: '3.5 months',
    //     repairCost: 'Upon request'
    // }
];



function slider(sliderOptions) {

    let options = sliderOptions || {
        autoPlay: false,
        autoInterval: 0
    };

    const photosContainer = document.querySelector(".photos");
    const prevArrow = document.querySelector(".prev");
    const nextArrow = document.querySelector(".next");
    const slidePoints = document.querySelectorAll('.point');
    const slideText = document.querySelector('.block__options');
    const slideLinks = document.querySelectorAll('.link_text')
    initPhotos();
    initArrows();
    initDout();
    initLinks();

    if (options.autoPlay) {
        autoSlider();
    };

    function initDout() {
        slidePoints.forEach((point, index) => {
            point.classList.add('n' + index);
            point.setAttribute('data-index', index);
            if (index === 0) {
                point.classList.add('active_point');
            }
        });
        slidePoints.forEach(dot => {
            dot.addEventListener('click', function () {
                moveSlider((+this.dataset.index));
                document.querySelector('.active_point').classList.remove('active_point');
                this.classList.add('active_point');
                moveLinks(+this.dataset.index);

                let curNum = +photosContainer.querySelector('.active').dataset.index;
                initText(curNum);
            });

        });
    }
    function movePoints(num) {
        document.querySelector('.active_point').classList.remove('active_point');
        slidePoints[num].classList.add('active_point');
    }
    function moveLinks(num) {
        document.querySelector('.link_active').classList.remove('link_active');
        slideLinks[num].classList.add('link_active');
    }

    function initLinks() {
        slideLinks.forEach((link, index) => {
            link.setAttribute('data-index', index);
            if (index === 0) {
                link.classList.add('link_active')
            }
        });
        slideLinks.forEach(link => {
            link.addEventListener('click', function () {
                moveSlider(+this.dataset.index);
                document.querySelector('.link_active').classList.remove('link_active');
                this.classList.add('link_active');
                movePoints(+this.dataset.index);

                let curNum = +photosContainer.querySelector('.active').dataset.index;
                initText(curNum);
            })
        });
    }


    function initPhotos() {
        info.forEach((info, index) => {
            let imageDiv = `<div class='image n${index} ${index === 0 ? "active" : ""}' data-index=${index} style='background-image: url(${info.img});'></div>`;
            photosContainer.innerHTML += imageDiv;
        });
    }

    function initArrows() {
        prevArrow.addEventListener('click', function () {
            let curNum = +photosContainer.querySelector('.active').dataset.index;
            let nextNum = curNum === 0 ? info.length - 1 : (curNum - 1);
            let activePoint = +document.querySelector('.active_point').dataset.index;
            let nextPoint = activePoint === 0 ? slidePoints.length - 1 : activePoint - 1;
            movePoints(nextPoint);
            moveSlider(nextNum);
            initText(nextNum);
            moveLinks(nextPoint);
        });

        nextArrow.addEventListener('click', function () {
            let curNum = +photosContainer.querySelector('.active').dataset.index;
            let nextNum = curNum === info.length - 1 ? 0 : (curNum + 1);
            let activePoint = document.querySelector('.active_point');
            let numPoint = +activePoint.dataset.index;
            let nextPoint = numPoint === slidePoints.length - 1 ? 0 : numPoint + 1;
            movePoints(nextPoint);
            moveSlider(nextNum);
            initText(nextNum);
            moveLinks(nextPoint);
        });
    }

    function moveSlider(num) {
        photosContainer.querySelector('.active').classList.remove('active');
        photosContainer.querySelector('.n' + num).classList.add('active');
    }

    function autoSlider() {
        setInterval(() => {
            let curNum = +photosContainer.querySelector('.active').dataset.index;
            let nextNum = curNum === info.length - 1 ? 0 : (curNum + 1);
            let activePoint = document.querySelector('.active_point');
            let numPoint = +activePoint.dataset.index;
            let nextPoint = numPoint === 2 ? 0 : numPoint + 1;
            moveSlider(nextNum);
            movePoints(nextPoint);
            initText(nextNum);
            moveLinks(nextPoint);

        }, options.autoInterval);
    }

    function initText(num) {
        let city = slideText.querySelector('p.city_text');
        city.style.opacity = 0;
        setTimeout(() => {
            city.innerHTML = info[num].city;
            city.style.opacity = 1;
        }, 300);

        let apartmentArea = slideText.querySelector('p.apartmentArea_text');
        apartmentArea.style.opacity = 0;
        setTimeout(() => {
            apartmentArea.innerHTML = info[num].apartmentArea;
            apartmentArea.style.opacity = 1;
        }, 300);

        let repair_time = slideText.querySelector('p.repairTime_text');
        repair_time.style.opacity = 0;
        setTimeout(() => {
            repair_time.innerHTML = info[num].repair_time;
            repair_time.style.opacity = 1;
        }, 300);

        let repairCost = slideText.querySelector('p.repairCost_text');
        repairCost.style.opacity = 0;
        setTimeout(() => {
            repairCost.innerHTML = info[num].repairCost;
            repairCost.style.opacity = 1;
        }, 300);
    }
}

let sliderOptions = {
    autoPlay: false,
    autoInterval: 3000
};

document.addEventListener("DOMContentLoaded", function () {
    slider(sliderOptions);
});
