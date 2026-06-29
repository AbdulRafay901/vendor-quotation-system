
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded, fetching activities...");
    fetchActivities();
});


function fetchActivities() {

    axios.get('http://localhost:8000/api/auth/activities',{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    }) 
        .then(response => {
            const activities = response.data.data;
            const timelineWrapper = document.getElementById('activities-timeline');

            console.log(activities)
            
            // Clear existing loading state/skeleton
            timelineWrapper.innerHTML = '';

            activities.forEach(activity => {
                const timelineItem = `
                    <div class="timeline-row">
                        <div class="timeline-time">${activity.time_ago}</div>
                        <div class="timeline-icon-box ${activity.badge_color}">
                            <i class="${activity.icon}"></i>
                        </div>
                        <div class="timeline-body">
                            ${activity.title}
                        </div>
                    </div>
                `;
                timelineWrapper.innerHTML += timelineItem;
            });
        })
        .catch(error => {
            console.error('Error fetching activities:', error);
            document.getElementById('activities-timeline').innerHTML = 
                '<p style="color: red; padding-left: 110px;">Failed to load activities.</p>';
        });
}