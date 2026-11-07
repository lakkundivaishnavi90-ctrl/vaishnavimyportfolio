// ===================================
// LOAD PORTFOLIO DATA USING FETCH API
// ===================================

async function loadPortfolio() {

    const loadingMessage = document.getElementById("loadingMessage");
    const errorMessage = document.getElementById("errorMessage");
    const portfolioContent = document.getElementById("portfolioContent");

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("JSON file could not be loaded.");
        }

        const data = await response.json();

        // Display portfolio content
        portfolioContent.hidden = false;
        loadingMessage.style.display = "none";

        // Load all website sections
        displayPersonalDetails(data.personal);
        displayAbout(data.about);
        displaySkills(data.skills);
        displayProjects(data.projects);
        displayEducation(data.education);
        displayCertifications(data.certifications);
        displaySocialLinks(data.socialLinks);

        document.getElementById("copyrightText").textContent =
            `© ${new Date().getFullYear()} ${data.personal.name}. All Rights Reserved.`;

        // Activate contact form
        setupContactForm();

    } catch (error) {

        console.error("Portfolio Error:", error);

        loadingMessage.style.display = "none";
        errorMessage.hidden = false;

    }

}


// ===================================
// DISPLAY PERSONAL DETAILS
// ===================================

function displayPersonalDetails(personal) {

    document.getElementById("navLogo").textContent =
        personal.name;

    document.getElementById("heroGreeting").textContent =
        personal.greeting;

    document.getElementById("studentName").textContent =
        personal.name;

    document.getElementById("studentRole").textContent =
        personal.role;

    document.getElementById("studentIntro").textContent =
        personal.introduction;

    document.getElementById("careerGoal").textContent =
        "Career Goal: " + personal.careerGoal;

    document.getElementById("profileImage").src =
        personal.profileImage;

    document.getElementById("aboutImage").src =
        personal.profileImage;

    document.getElementById("resumeButton").href =
        personal.resume;

    document.getElementById("aboutName").textContent =
        personal.name;

    document.getElementById("aboutEmail").textContent =
        personal.email;

    document.getElementById("aboutPhone").textContent =
        personal.phone;

    document.getElementById("aboutCourse").textContent =
        personal.course;

    document.getElementById("contactEmail").textContent =
        personal.email;

    document.getElementById("contactPhone").textContent =
        personal.phone;

    document.getElementById("footerName").textContent =
        personal.name;

}


// ===================================
// DISPLAY ABOUT INFORMATION
// ===================================

function displayAbout(about) {

    document.getElementById("aboutHeading").textContent =
        about.heading;

    document.getElementById("aboutDescription").textContent =
        about.description;

}


// ===================================
// DISPLAY SKILLS
// ===================================

function displaySkills(skills) {

    const container = document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach(skill => {

        const column = document.createElement("div");
        column.className = "col-6 col-md-4 col-lg-3";

        const card = document.createElement("div");
        card.className = "skill-card";

        const icon = document.createElement("i");
        icon.className = `bi ${skill.icon} skill-icon`;

        const heading = document.createElement("h4");
        heading.textContent = skill.name;

        const progress = document.createElement("div");
        progress.className = "skill-level";

        const progressBar = document.createElement("div");
        progressBar.className = "skill-progress";
        progressBar.style.width = skill.level + "%";

        progress.appendChild(progressBar);

        const percentage = document.createElement("span");
        percentage.className = "skill-percent";
        percentage.textContent = skill.level + "%";

        card.append(icon, heading, progress, percentage);

        column.appendChild(card);

        container.appendChild(column);

    });

}


// ===================================
// DISPLAY PROJECTS
// ===================================

function displayProjects(projects) {

    const container = document.getElementById("projectsContainer");

    container.innerHTML = "";

    projects.forEach(project => {

        const column = document.createElement("div");
        column.className = "col-md-6 col-lg-4";

        const card = document.createElement("div");
        card.className = "project-card";

        const image = document.createElement("img");
        image.src = project.image;
        image.alt = project.name;
        image.loading = "lazy";

        const content = document.createElement("div");
        content.className = "project-content";

        const heading = document.createElement("h4");
        heading.textContent = project.name;

        const description = document.createElement("p");
        description.textContent = project.description;

        const technologies = document.createElement("div");

        project.technologies.forEach(technology => {

            const badge = document.createElement("span");
            badge.className = "tech-badge";
            badge.textContent = technology;

            technologies.appendChild(badge);

        });

        const link = document.createElement("a");
        link.className = "project-link";
        link.href = project.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "View Project →";

        content.append(
            heading,
            description,
            technologies,
            link
        );

        card.append(image, content);

        column.appendChild(card);

        container.appendChild(column);

    });

}


// ===================================
// DISPLAY EDUCATION
// ===================================

function displayEducation(education) {

    const container = document.getElementById("educationContainer");

    container.innerHTML = "";

    education.forEach(item => {

        const card = document.createElement("div");
        card.className = "education-card";

        const heading = document.createElement("h3");
        heading.textContent = item.course;

        const college = document.createElement("p");
        college.textContent = item.college;

        const year = document.createElement("span");
        year.className = "education-year";
        year.textContent = item.year;

        const semester = document.createElement("p");
        semester.textContent = "Semester: " + item.semester;

        const details = document.createElement("p");
        details.textContent = item.details;

        card.append(
            heading,
            college,
            year,
            semester,
            details
        );

        container.appendChild(card);

    });

}


// ===================================
// DISPLAY CERTIFICATIONS
// ===================================

function displayCertifications(certifications) {

    const container = document.getElementById("certificationsContainer");

    container.innerHTML = "";

    certifications.forEach(certificate => {

        const column = document.createElement("div");
        column.className = "col-md-6 col-lg-4";

        const card = document.createElement("div");
        card.className = "certificate-card";

        const icon = document.createElement("i");
        icon.className = "bi bi-award-fill";

        const heading = document.createElement("h4");
        heading.textContent = certificate.name;

        const organization = document.createElement("p");
        organization.textContent = certificate.organization;

        const date = document.createElement("p");
        date.textContent = "Year: " + certificate.year;

        card.append(icon, heading, organization, date);

        if (certificate.link) {

            const link = document.createElement("a");
            link.href = certificate.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.className = "project-link";
            link.textContent = "View Certificate →";

            card.appendChild(link);

        }

        column.appendChild(card);

        container.appendChild(column);

    });

}


// ===================================
// DISPLAY SOCIAL MEDIA LINKS
// ===================================

function displaySocialLinks(socialLinks) {

    const containers = [
        document.getElementById("socialLinks"),
        document.getElementById("footerSocial")
    ];

    containers.forEach(container => {

        container.innerHTML = "";

        socialLinks.forEach(social => {

            const link = document.createElement("a");

            link.href = social.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.title = social.name;
            link.setAttribute("aria-label", social.name);

            const icon = document.createElement("i");
            icon.className = `bi ${social.icon}`;

            link.appendChild(icon);

            container.appendChild(link);

        });

    });

}


// ===================================
// CONTACT FORM VALIDATION
// ===================================

function setupContactForm() {

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get input values
        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmailInput").value.trim();

        const subject = document.getElementById("contactSubject").value.trim();

        const message = document.getElementById("contactMessage").value.trim();

        // Error elements
        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const subjectError = document.getElementById("subjectError");
        const messageError = document.getElementById("messageError");

        const formStatus = document.getElementById("formStatus");

        // Clear old errors
        nameError.textContent = "";
        emailError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";
        formStatus.textContent = "";

        let isValid = true;

        // Name validation
        if (name.length < 2) {
            nameError.textContent =
                "Please enter a valid name.";

            isValid = false;
        }

        // Email validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            isValid = false;
        }

        // Subject validation
        if (subject.length < 3) {

            subjectError.textContent =
                "Subject must contain at least 3 characters.";

            isValid = false;
        }

        // Message validation
        if (message.length < 10) {

            messageError.textContent =
                "Message must contain at least 10 characters.";

            isValid = false;
        }

        // If validation fails
        if (!isValid) {
            return;
        }

        // Successful front-end validation
        formStatus.textContent =
            "Thank you! Your form is valid.";

        form.reset();

    });

}


// ===================================
// START PORTFOLIO WEBSITE
// ===================================

loadPortfolio();
