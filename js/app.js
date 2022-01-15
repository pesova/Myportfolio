const TypingText = document.querySelector(".typed-text");
const AutoTyping = document.querySelector(".TypeCursor");

const textArray = ["Build.", "Create.", "Design.", "Have Passion for coding.", "Love Team work."];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!AutoTyping.classList.contains("typing")) AutoTyping.classList.add("typing");
        TypingText.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        AutoTyping.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!AutoTyping.classList.contains("typing")) AutoTyping.classList.add("typing");
        TypingText.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        AutoTyping.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});


function projectTemplate(data){
    let projects = ``;

    data.forEach(project => {

        projects += `<div class="col-lg-4 col-sm-6 mb-4">
                        <div class="portfolio-item" >
                            <a class="portfolio-link" data-toggle="modal" href="javascript:void(0);" onclick="projectModal(this)" 
                                data-name="${project.name}"
                                data-description="${project.description}" data-long_description="${project.long_description}"
                                data-date="${project.date}"
                                data-client="${project.client}"
                                data-category="${project.category}"
                                data-image="${project.image}"
                                data-link="${project.link}"
                                >
                                <div class="portfolio-hover">
                                    <div class="portfolio-hover-content"><i style="color: #6b54eb" class="fas fa-plus fa-3x"></i></div>
                                </div>
                                <img class="img-fluid" src="assets/img/logos/${project.image}" alt="${project.name}" />
                            </a>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">${project.name}</div>
                                <div class="portfolio-caption-subheading text-muted">${project.description}</div>
                            </div>
                        </div>
                    </div>`

    });

    return projects;

}

let Projects = [
    {
        name: "Pastecs",
        description: "Online Learning Platform",
        long_description: "Worked with a team in developing this web portal with Admin panel used by schools to post online courses and employ tutors around the world.",
        date: "October 2020",
        client: "Chuks (School Director)",
        category: "Learning Platform",
        image: "pastecs.png",
        link: "https://pastecsv2.herokuapp.com/"
    },
    {
        name: "HNG Project",
        description: "My Customer Web App",
        long_description: `This Project was built As team Project In HNG. MyCustomer is like a ledger book where you keep records of your business. As A user, You create stores and add assistants to each of your stores if you want. Mycustomer app can also help users record the transactions that occur in each store It can be credit or debit. NB: I Contributed Under Store Management.`,
        date: "June 2020",
        client: "Business Men And Women",
        category: "Business Web",
        image: "mycustomer.png",
        link: "https://customerpay.me/"
    },
    {
        name: "Strip It",
        description: "Video Posting Site",
        long_description: "Single-handedly Developed this full-stack web application, using PHP (Laravel) that has a three level user role (user, performer, moderator, admin), where performers post videos and get tipped by users, and recieve there payment through stripe or paypal.",
        date: "March 2021",
        client: "Fibre User",
        category: "Video Portal",
        image: "Stripit.png",
        link: "https://stripit.herokuapp.com/"
    },
    {
        name: "Peso Tech",
        description: "Ethical Hacking Site",
        long_description: `I created this blog site myself, where i posted many ethical hacking tutorials, and usefull hints for Programmers, Script handlers and Hackers. Take Note it is an educational site, and every tips used is at users risk.
        NB: I built this when i was learning JavaScript.`,
        date: "2019",
        client: "Personal",
        category: "Programmers & Ethical Hackers blog",
        image: "PCbots.jpg",
        link: "https://pesova.github.io/PesoTech/"
    },
    {
        name: "SNG Project",
        description: "Basic Hospital Website ",
        long_description: "This is A Personal Hospital Website I built with HTML, CSS and pure PHP. In This Site you can book Appointments with Doctors and Nurses and pay online. Doctors and Nurses can also sign in and see patients that booked them.",
        date: "January 2020",
        client: "Doctors and Patients",
        category: "Hospital Web",
        image: "hospital-logo2.png",
        link: "https://pesova.000webhostapp.com/"
    },
    {
        name: "Quiz",
        description: "Simple Quiz Game",
        long_description: "This is a simple quiz I built in StartNg JavaScript class. It calculates your score as you answer questions.",
        date: "March 2020",
        client: "Personal",
        category: "Quiz Game",
        image: "quiz.png",
        link: "https://pesova.github.io/quizGame/"
    },
];



$(document).ready(function() {

    let divProjects = document.getElementById('projects_section');

    let allProjects = projectTemplate(Projects);

    divProjects.innerHTML = allProjects;
});

function projectModal(element){

    const {name,
            description,
            long_description,
            date,
            client,
            category,
            image,
            link} = element.dataset;

    console.log(link, image);
    $("#project_name").text(name);
    $("#project_description").text(description);
    $("#project_long_description").text(long_description);
    $("#project_date").text(`Date: ${date}`);
    $("#project_client").text(`CLient: ${client}`);
    $("#project_category").text(`Category: ${category}`);
    $("#project_link").attr("href", link);
    $('#project_image').attr("src", `assets/img/logos/${image}`);

    $('#projectsModal').modal('toggle');
}

