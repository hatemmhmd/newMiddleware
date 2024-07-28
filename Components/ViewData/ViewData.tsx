Index 1

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Design.css">
    <title>Document</title>
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
                <p>Welcome to <span>pir live!</span> <br>
                    Ensure Your System's Health With Real-Time Log Monitoring And Automated Checks Gain Insights Through
                    Comprehensive Analytics And User-Friendly Dashboards
                </p>
                <button>let's get started</button>
            </div>
        </div>
        <div class="logo-text fade-in">
            <img src='./Images/pie-chart.gif' alt="Chart" />
        </div>
    </div>

</body>

</html>


              
--------------------------------------
* {
    margin: 0;
    padding: 0;
    font-family: Verdana, Geneva, Tahoma, sans-serif
}

body {
    background-color: white;
}


.header {
    background-image: url('./Images//Design.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100px;
    display: flex;
    justify-content: space-between;
    padding: 0 100px;
    align-items: center;
}

.header img {
    width: 200px;
}

.header h3 {
    color: white;
    font-size: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
}

.content {
    display: flex;
    justify-content: space-between;
    padding: 0px 170px;
    align-items: center;
    height: 80vh;
}

.content .left {
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
}

.content .left .flags img {
    width: 30px;
}

.content .text {
    width: 60%;
    text-align: left;
}

.content p {
    font-size: 25px;
    letter-spacing: 1px;
    line-height: 65px;
    text-transform: capitalize;
    margin: 15px 0;
}

.content p span {
    text-transform: uppercase;
    color: #015699;
    font-weight: 500;
}

.content .logo-text {
    width: 1000px;
}

.content .logo-text img {
    width: 100%;
}


@keyframes move {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}


.content .text button {
    background-color: #015699;
    padding: 15px;
    border: none;
    outline: none;
    border-radius: 10px;
    text-transform: capitalize;
    color: white;
    cursor: pointer;
    font-size: 15px;
    transition: 0.3s linear;
}

.content .text button:hover {
    background-color: #015799a8;
}


.fade-in {
    opacity: 0;
    animation: fadeInAnimation ease 2s;
    animation-fill-mode: forwards;
}


@keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}


-----------------------------------------------------------


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Design2.css">
    <title>Document</title>
</head>

<body>
    <div class="header">
        <h3>pir live</h3>
        <img src="./Images//374822-removebg-preview.png">
    </div>

    <div class="container">
        <div class="content">
            <div class="leftOne">
                <h1>Welcome To PIR LIVE!</h1>
                <p>
                    Ensure your system's health with real-time log monitoring and automated checks.
                    Gain insights through comprehensive analytics and user-friendly dashboards.
                </p>
                <a class="button">Let's Get Started</a>
            </div>
            <div class="gif-logo">
                <img src="./Images/pie-chart.gif">
            </div>
            <div class="flags">
                <img src="./Images/jordan.png" alt="Flag 1" class="flag">
                <img src="./Images//palestine.png" alt="Flag 2" class="flag">
                <img src="./Images//flag.png" alt="Flag 3" class="flag">
                <img src="./Images/morocco.png" alt="Flag 4" class="flag">
            </div>
        </div>
    </div>

</body>

</html>
-----------------------------
* {
    margin: 0;
    padding: 0;
    font-family: Verdana, Geneva, Tahoma, sans-serif
}

body {
    background-color: white;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 80vh;
}


.header {
    height: 100px;
    background-color: #004d99;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 0 100px;
    align-items: center;
}

.header h3 {
    font-size: 40px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 500;
}

.header img {
    width: 170px;
}



.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    width: 80%;
    height: 580px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.leftOne {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-weight: 500;
    width: 500px;
}


.flag {
    margin: 15px 0;
    width: 33px;
    display: flex;
    flex-direction: column;
}


.content h1 {
    color: #004d99;
    margin-bottom: 10px;
}

.content p {
    font-size: 20px;
    color: #333;
    margin: 25px 0;
    line-height: 30px;


}

.gif-logo img {
    width: 400px;
}


.gif-logo {
    transform: translateX(140px);
}


.button {
    background-color: #004d99;
    color: white;
    border: none;
    padding: 15px 20px;
    font-size: 1em;
    border-radius: 5px;
    width: fit-content;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-decoration: none;
    margin-top: 30px
}

.button:hover {
    background-color: #003366;
}










 
