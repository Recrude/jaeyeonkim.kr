// Load saved memos from local storage when the page is loaded
window.onload = function() {
    loadMemos();
};

// Save the memo text and images to local storage
function saveMemo() {
    const memoText = document.getElementById('memoText').value;
    const imageContainer = document.getElementById('imageContainer');
    const images = Array.from(imageContainer.getElementsByTagName('img')).map(img => img.src);

    const memo = {
        text: memoText,
        images: images,
        timestamp: new Date().toISOString()
    };

    // Retrieve current memos from local storage or initialize to empty array
    let memos = JSON.parse(localStorage.getItem('memos')) || [];
    memos.push(memo);
    localStorage.setItem('memos', JSON.stringify(memos));

    // Clear the text area and image container
    document.getElementById('memoText').value = '';
    imageContainer.innerHTML = '';

    // Reload the memo list
    loadMemos();
}

// Load memos from local storage and display them
function loadMemos() {
    const memoList = document.getElementById('memoList');
    memoList.innerHTML = '';
    const memos = JSON.parse(localStorage.getItem('memos')) || [];

    memos.forEach(memo => {
        const memoDiv = document.createElement('div');
        memoDiv.className = 'memo';

        const memoText = document.createElement('p');
        memoText.textContent = memo.text;

        const memoImages = document.createElement('div');
        memo.images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.style.maxWidth = '100px';
            memoImages.appendChild(img);
        });

        memoDiv.appendChild(memoText);
        memoDiv.appendChild(memoImages);
        memoList.appendChild(memoDiv);
    });
}

// Upload an image and display it
function uploadImage() {
    const fileInput = document.getElementById('imageUpload');
    const files = fileInput.files;

    if (files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            document.getElementById('imageContainer').appendChild(img);
        };
        reader.readAsDataURL(files[0]);
    }
}
