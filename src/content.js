if (window.location.href.includes('#PPA_S3_ProTime-ui5_protime_capture')) {
	browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
		if (message.action === 'fillPresenceTime') {
			console.log('Filling form');

			let times = Array.from(document.querySelectorAll('li.backgroundActivityTimes'))
				.map((li) => {
					return {
						startTime: li.querySelector('input[id^="__xmlview1--docItemStartTime-"]').value,
						endTime: li.querySelector('input[id^="__xmlview1--docItemEndTime-"]').value,
					};
				});

			times = combineTimeRanges(times);

			// TODO
			console.log(JSON.stringify(times, null, 2));
		}
	});
}

function combineTimeRanges(timeRanges) {
	const combinedRanges = [];
	let currentRange = timeRanges[0];

	for (let i = 1; i < timeRanges.length; i++) {
		const nextRange = timeRanges[i];

		if (currentRange.endTime === nextRange.startTime) {
			currentRange.endTime = nextRange.endTime;
		} else {
			combinedRanges.push(currentRange);
			currentRange = nextRange;
		}
	}

	combinedRanges.push(currentRange);
	return combinedRanges;
}
