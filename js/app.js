const loadDetails = async () => {
    const searchText = document.getElementById("search-box").value;
    const videoId = getYouTubeVideoId(searchText);
    const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyDbmqwHc8S-GHtgXjXU0AhQz7kWOjqRxmI`);
    const data = await res.json();

    const thumbnails = data.items[0].snippet.thumbnails;
    const videoId2 = data.items[0].id;
    const channelId = data.items[0].snippet.channelId;
    const videoTitle = data.items[0].snippet.title;
    const videoDes = data.items[0].snippet.description;
    document.getElementById("video-id").innerText = videoId2;
    document.getElementById("channel-id").innerText = channelId;
    document.getElementById("title").innerText = videoTitle;
    document.getElementById("description").innerText = videoDes;

    const downloadThumbnail = (url) => {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.download = "thumbnail.jpg"; 
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Loop through different thumbnail sizes
    ['maxres', 'standard', 'high', 'medium', 'default'].forEach(size => {
        const thumbnailUrl = thumbnails[size]?.url;
        if (thumbnailUrl) {
            document.getElementById(`${size}-down`).addEventListener("click", () => {
                downloadThumbnail(thumbnailUrl);
            });
            document.getElementById(size).src = thumbnailUrl;
        }
    });
    displayTags()
};


const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    const error = document.getElementById("error");
    return match && match[1] ? match[1] : alert("Please enter valid url");
};

const displayTags = async () => {
    const searchText = document.getElementById("search-box").value;
    const videoId = getYouTubeVideoId(searchText); // Assuming getYouTubeVideoId function is defined elsewhere

    const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyDbmqwHc8S-GHtgXjXU0AhQz7kWOjqRxmI`);
    const data = await res.json();

    const tags = data.items[0].snippet.tags;
    
    let tagElement = document.getElementById("tags");
    let tagElementValue = '';

    tags.forEach(tag => {
        tagElementValue += tag + ', ' ; 
    });

    tagElement.value = tagElementValue; 
}


document.getElementById('copy').addEventListener('click',function(){
    const genPass = document.getElementById('tags').value;
    if(genPass !== ""){
        copyText();
    }

})

function copyText() {
    let copyText = document.getElementById("tags");
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(copyText.value);
    }