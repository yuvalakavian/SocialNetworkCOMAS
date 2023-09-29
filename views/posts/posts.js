// Function to display image preview
document.getElementById('imageUpload').addEventListener('change', function () {
    const imagePreview = document.getElementById('imagePreview');
    const fileInput = this;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'img-fluid';
            img.style.maxHeight = '200px'; // Adjust the max height as needed
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
});