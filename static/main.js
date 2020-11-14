const aleartbox = document.getElementById('alert-box');
const imgBox = document.getElementById('img-box');
const form = document.getElementById('p-form');

const name = document.getElementById('id_name');
const description = document.getElementById('id_description');
const image = document.getElementById('id_image');

const csrf = document.getElementsByName('csrfmiddlewaretoken');

console.log(csrf);

const url = "";

const handleAlerts = (type, text) => {
    aleartbox.innerHTML = `
        <div class="alert alert-${type}" role="alert">
           <strong>${text}</strong>
        </div>
    `
}

image.addEventListener('change', () => {
    const img_data = image.files[0];
    const url = URL.createObjectURL(img_data);
    console.log(url);
    imgBox.innerHTML = `<img src="${url}" width="50%">`;
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('csrfmiddlewaretoken', csrf[0].value);
    fd.append('name', name.value);
    fd.append('description', description.value);
    fd.append('image', image.files[0]);

    $.ajax({
        type: 'POST',
        url: url,
        enctype: 'multipart/form-data',
        data: fd,
        success: function (response) {
            console.log(response);
            const text = `Form name ${response.name} submitted successfully.`
            handleAlerts('success', text);
            setTimeout(() => {
                aleartbox.innerHTML = "";
                imgBox.innerHTML = ""
                name.value = "";
                description.value = "";
                image.value = "";
            }, 3000)
        },
        error: function (error) {
            console.log(error);
            handleAlerts('danger', 'Sorry! Form does not submitted.');
        },
        cache: false,
        contentType: false,
        processData: false,
    });
});

console.log(form);