<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="design.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <title>Document</title>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>

<body>


    <div class="header">
        <h3>pir live</h3>
        <img src="./Images//374822-removebg-preview.png">
    </div>



    <div class="content">
        <div class="left">
            <div class="flags">
                <img src="./Images/jordan.png">
                <img src="./Images//palestine.png">
                <img src="./Images/flag.png">
                <img src="./Images/morocco.png">
            </div>
            <div class="text fade-in">
                <p>Welcome to <span>pir live!</span> <br> Ensure your app's health with ease</p>
                <button>let's get started</button>
            </div>
        </div>
        <div class="logo-text fade-in">
            <!-- <img src="./Images/pie-chart (1).png"> -->
            <video autoplay loop muted playsinline>
                <source src="./Images/analyticsblack.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    </div>


    <script src="JavaScript.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>


</body>

</html>

-------------------------------------------
/* Container */
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f0f4f7;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
}

/* Header */
.header {
    background-color: #004d99;
    color: white;
    width: 100%;
    padding: 10px;
    text-align: center;
    font-size: 2em;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Content */
.content {
    text-align: center;
    padding: 20px;
    margin-top: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 600px;
}

/* Flags */
.flags {
    margin: 20px 0;
}

.flag {
    margin: 0 5px;
    width: 32px;
    height: 20px;
    border-radius: 3px;
}

/* Text */
.content h1 {
    color: #004d99;
    margin-bottom: 10px;
}

.content p {
    font-size: 1.2em;
    color: #333;
}

/* Button */
.button {
    background-color: #004d99;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-decoration: none;
}

.button:hover {
    background-color: #003366;
}

/* Image */
.image {
    width: 50%;
    max-width: 300px;
    margin-top: 20px;
}
