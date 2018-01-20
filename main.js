(function(){
	const control = document.getElementById('control');

	control.onclick = function(evt){
		progress(evt.target.value);
	};

	const progressBar = document.querySelector('.progress-container');
	console.log(progressBar);
	const dataValue = progressBar.getAttribute('data-value');
	const progressValue = progressBar.querySelector('.progress-bar__value');
	const radius = progressValue.getAttribute('r');

    const btnStartAnimate = document.getElementById('checkbox-animate');
	const btnHideProgress = document.getElementById('checkbox-hide');

	let circumference = 2 * Math.PI * radius;
	progressValue.style.strokeDasharray = circumference;

    
    progress(dataValue);
    
    function progress(value) {
    	let progress = value / 100;
    	let dashoffset = circumference * (1 - progress);

    	console.log('progress:', value + '%', '|', 'offset:', dashoffset);

    	progressValue.style.strokeDashoffset = dashoffset;

    	animateValue(0, dataValue, 1500);
    }

    function animateValue(start, end, duration) {
    	let range = end - start;
    	let minTimer = 50;
    	let stepTime = Math.abs(Math.floor(duration / range));

    	stepTime = Math.max(stepTime, minTimer);

    	let startTime = new Date().getTime();
    	let endTime = startTime + duration;

    	function run() {
    		let now = new Date().getTime();
    		let remaining = Math.max((endTime - now) / duration, 0);
    		let value = Math.round(end - remaining * range);
    		if (value === end) {
    			clearInterval(timer);
    		}
    	}

    	let timer = setInterval(run, stepTime);
    	run();
    }

    btnStartAnimate.addEventListener('click', function() {
    	progressValue.classList.toggle('animate');
    })

    btnHideProgress.addEventListener('click', function() {
    	progressBar.classList.toggle('hidden');
    })


})();