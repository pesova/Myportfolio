<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#ded9f3" />
    <meta name="description" content="Pesova Profile" />
    <meta name="author" content="Pesova Osueke" />
    <title>Pesova Portfolio</title>
    <link rel="icon" type="image/x-icon" href="assets/img/about/mine/wedprof.jpg" />
    <link rel="apple-touch-icon" href="assets/img/about/mine/wedprof.jpg">

    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="css/styles.css" rel="stylesheet" />
    <link href="css/app.css" rel="stylesheet" />
    <link rel="preload" as="image" href="assets/img/header-bg.webp" />

</head>

<body id="page-top">
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="#page-top">Pesova</a>

            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav text-uppercase ml-auto">
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">About</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#Projects">Projects</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#services">Services</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- Masthead-->
    <header class="masthead">
        <div class="container">
            <div class="masthead-subheading" data-aos="fade-right">Welcome To My Portfolio</div>
            <div class="masthead-heading text-uppercase" data-aos="fade-left">It's Nice To Meet You</div>
        </div>
    </header>

<?php
session_start();

// Handle sessions differently for Railway vs Local
if (getenv('RAILWAY_ENVIRONMENT') || file_exists('/etc/railway')) {
    session_save_path('/tmp');
} else {
    // Local development - use local sessions directory
    if (!is_dir(__DIR__ . '/sessions')) {
        mkdir(__DIR__ . '/sessions', 0700, true);
    }
    session_save_path(__DIR__ . '/sessions');
}

$duration = 30 * 60;
$time = $_SERVER['REQUEST_TIME'];

if (isset($_SESSION['LAST_ACTIVITY']) && ($time - $_SESSION['LAST_ACTIVITY']) > $duration) {
    session_unset();
    session_destroy();
    session_start();
} else {
    $_SESSION['LAST_ACTIVITY'] = $time;
}

// Function to get access code safely
function getAccessCode() {
    // Check Railway environment variables first
    if (getenv('RAILWAY_ENVIRONMENT') || getenv('RAILWAY_STATIC_URL')) {
        return getenv('ACCESS_CODE') ?: '0000';
    }
    
    // Check local .env file
    if (file_exists(__DIR__ . '/.env') && file_exists(__DIR__ . '/vendor/autoload.php')) {
        require_once __DIR__ . '/vendor/autoload.php';
        try {
            $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
            $dotenv->load();
            return $_ENV['ACCESS_CODE'] ?? '0000';
        } catch (Exception $e) {
            return '0000';
        }
    }
    
    return '0000';
}

// Check if already authenticated
$isAuthenticated = isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true;

// If NOT authenticated, show the access modal

    // If NOT authenticated, show the access modal
    if (!$isAuthenticated):
    ?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js"></script>
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <script type="text/javascript" id="code_script">
            AOS.init({
                once: true,
            });
        </script>
        <!-- ACCESS MODAL - ONLY SHOWS WHEN NOT AUTHENTICATED -->
        <div class="modal access fade" id="accessCodeModal" tabindex="-1" data-backdrop="static" data-keyboard="false" role="dialog" aria-modal="true" style=" background-color: rgba(0, 0, 0, 0.5);" aria-hidden="true">
            <div class="modal-dialog modal-md modal-dialog-centered">
                <div class="modal-content" style="border-radius: 15px; overflow: hidden;">
                    <div class="modal-body" style="padding: 1.5rem;">
                        <!-- Portfolio Access Header -->
                        <div class="text-center mb-4">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">🔐</div>
                            <h3 class="font-weight-bold">Portfolio Access</h3>
                            <p class="text-muted">Security measure to ensure only those I want can access my portfolio 😊</p>
                        </div>

                        <!-- Access Code Input -->
                        <div class="form-group">
                            <div class="input-with-icon">
                                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#6c757d" id="passcode_icon">
                                    <path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9069372 8 4 8.9069372 4 10 L 4 20 C 4 21.093063 4.9069372 22 6 22 L 18 22 C 19.093063 22 20 21.093063 20 20 L 20 10 C 20 8.9069372 19.093063 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 6 10 L 18 10 L 18 20 L 6 20 L 6 10 z M 12 13 C 10.9 13 10 13.9 10 15 C 10 16.1 10.9 17 12 17 C 13.1 17 14 16.1 14 15 C 14 13.9 13.1 13 12 13 z"></path>
                                </svg>
                                <input type="password"
                                    class="form-control code-input-with-icon"
                                    id="codeInput"
                                    name="code"
                                    placeholder="••••"
                                    maxlength="4"
                                    autocomplete="off"
                                    style="padding-left: 60px;">
                            </div>

                            <!-- Status Indicators -->
                            <div class="mt-3 text-center">
                                <div class="loading-spinner" id="loadingSpinner" style="width: 25px; height: 25px; border: 3px solid #f3f3f3; border-top: 3px solid #6b54eb; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto; display: none;"></div>
                                <div class="status-icon mt-2">
                                    <span id="successIcon" style="color: #28a745; font-size: 1rem; display: none;">✓</span>
                                    <span id="errorIcon" style="color: #dc3545; font-size: 1rem; display: none;">✗</span>
                                </div>
                            </div>

                            <!-- Status Messages -->
                            <div class="mt-1">
                                <p id="statusMessage" class="text-center mb-0" style="min-height: 20px;"></p>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="text-center mt-1">
                            <small class="text-muted">
                                Contact <a href="mailto:pesova13@gmail.com" style="color: #6b54eb;">pesova13@gmail.com</a> for access
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            $(document).ready(function() {
                const codeInput = $("#codeInput");
                const loadingSpinner = $("#loadingSpinner");
                const successIcon = $("#successIcon");
                const errorIcon = $("#errorIcon");
                const statusMessage = $("#statusMessage");
                const passcodeIcon = $("#passcode_icon");                
                setTimeout(function() {
                    $("#accessCodeModal").modal("show");
                    $('#accessCodeModal').on('shown.bs.modal', function() {
                        codeInput.focus();
                    });
                }, 1000);

                codeInput.on("input", function() {
                    const code = $(this).val();

                    // Update lock icon color
                    if (code.length > 0) {
                        passcodeIcon.css("fill", "#6b54eb");
                    } else {
                        passcodeIcon.css("fill", "#6c757d");
                    }
                    successIcon.hide();
                    errorIcon.hide();
                    statusMessage.text("").removeClass("text-success text-danger");
                    codeInput.removeClass("is-valid is-invalid");
                    if (code.length === 4) {
                        verifyCode(code);
                    }
                });

                // Handle paste event
                codeInput.on("paste", function(e) {
                    setTimeout(() => {
                        const code = $(this).val();
                        if (code.length === 4) {
                            verifyCode(code);
                        }
                    }, 10);
                });

                function verifyCode(code) {
                    loadingSpinner.show();
                    codeInput.prop("disabled", true);

                    // Send to server for verification
                    $.ajax({
                        url: "verify-code.php",
                        type: "POST",
                        data: {
                            code: code
                        },
                        success: function(response) {
                            loadingSpinner.hide();
                            codeInput.prop("disabled", false);

                            if (response.valid) {
                                successIcon.show();
                                statusMessage.text("Access granted! Redirecting...").addClass("text-success");
                                codeInput.addClass("is-valid");
                                passcodeIcon.css("fill", "#28a745");

                                // Redirect after brief delay
                                setTimeout(() => {
                                    window.location.reload();
                                }, 800);
                            } else {
                                errorIcon.show();
                                statusMessage.text(response.message || "Incorrect code. Try again.").addClass("text-danger");
                                codeInput.addClass("is-invalid");
                                passcodeIcon.css("fill", "#dc3545");

                                // Clear input after delay
                                setTimeout(() => {
                                    codeInput.val("").removeClass("is-invalid");
                                    codeInput.focus();
                                    successIcon.hide();
                                    errorIcon.hide();
                                    statusMessage.text("");
                                    passcodeIcon.css("fill", "#6c757d");
                                }, 1500);
                            }
                        },
                        error: function() {
                            loadingSpinner.hide();
                            codeInput.prop("disabled", false);
                            statusMessage.text("Network error. Please try again.").addClass("text-danger");
                            passcodeIcon.css("fill", "#dc3545");

                            setTimeout(() => {
                                statusMessage.text("");
                                passcodeIcon.css("fill", "#6c757d");
                            }, 2000);
                        }
                    });
                }

                // Allow backspace to clear validation
                codeInput.on("keydown", function(e) {
                    if (e.key === "Backspace" && $(this).val().length < 4) {
                        $(this).removeClass("is-valid is-invalid");
                        successIcon.hide();
                        errorIcon.hide();
                        statusMessage.text("");
                    }

                });
            });
        </script>

    <?php
        // Exit after showing modal
        exit("Access denied");
    endif;
    ?>
    <!-- About-->
    <section style="background-color: #1F1558" class="page-section" id="about">
        <div class="container">
            <div class="text-center" data-aos="fade-in">
                <h3 style="color: #eaeaf1" class="section-heading text-uppercase">About</h3>
                <br>

                <div id="AboutMe">

                    <p style="color: #e1e1ee" data-aos="zoom-in-up">
                        <b>
                            Hi, I'm Osueke Pesova, a Full Stack Developer from Nigeria with over 4 years of experience building scalable, secure, and user-focused web applications. I specialize in backend engineering, API design, and system architecture, with a strong passion for how technology solves real-world problems.
                        </b>
                    </p>

                    <p style="color: #cdcdd8" data-aos="zoom-in">
                        <b>
                            My curiosity for technology began early and evolved into a focused journey in software engineering. Over the years, I've worked extensively with TypeScript, Node.js, Express, AdonisJS, MongoDB, Redis, and RESTful API development, building systems that handle authentication, financial transactions, and data-driven workflows. I enjoy tackling complex challenges, optimizing performance, and writing clean, maintainable code.
                        </b>
                    </p>

                    <p style="color: #acacbd" data-aos="zoom-in-up">
                        <b>
                            Beyond coding, I'm skilled at collaborating with teams, mentoring others, and breaking down technical concepts in ways that make them easier to understand. I value continuous learning and adaptability, always exploring better ways to improve system design and developer experience. When I'm not building applications, I enjoy gaming and staying updated with emerging trends in technology.
                        </b>
                    </p>
                    <br>

                </div>

            </div>
        </div>



    </section>

    <!--TIMELINE-->
    <section style="background-color: #c8c2e9" class="page-section" id="timeline">
        <div class="container">
            <div class="text-center" data-aos="zoom-out-left">
                <h3 class="section-heading text-uppercase">Timeline</h3>
                <br>
            </div>
            <ul class="timeline">
                <li>
                    <div class="timeline-image" data-aos="zoom-out-right">
                        <img width="640" height="360" class="rounded-circle img-fluid" src="assets/img/about/mine/Prof-small.jpg" srcset="assets/img/about/mine/Prof-small.jpg 480w, assets/img/about/mine/Prof.jpg 1080w" sizes="50vw" alt="" />
                    </div>
                    <div class="timeline-panel">
                        <div class="timeline-heading">
                            <h4 data-aos="fade-down-right">2017-2018</h4>
                            <h4 class="subheading" data-aos="zoom-out-right">Humble Beginnings</h4>
                        </div>
                        <div class="timeline-body" data-aos="zoom-out-right">
                            <p class="text-black">I Started Basic HTML and CSS On My own, then Saw the wonderfull things JavaScript Could Do. I started building Cool basic Websites and Writing blogs. Then i could call myself A Frontend Developer.</p>
                        </div>
                    </div>
                </li>
                <li class="timeline-inverted">
                    <div class="timeline-image" data-aos="zoom-out-left">
                        <img width="640" height="360" class="rounded-circle img-fluid" src="assets/img/about/mine/Prof1.jpg" srcset="assets/img/about/mine/Prof1-small.jpg 480w, assets/img/about/mine/Prof1.jpg 1080w" sizes="50vw" alt="" />
                    </div>
                    <div class="timeline-panel">
                        <div class="timeline-heading">
                            <h4 data-aos="fade-down-left">2019</h4>
                            <h4 class="subheading" data-aos="zoom-out-left">Backend Journey</h4>
                        </div>
                        <div class="timeline-body" data-aos="zoom-out-left">
                            <p class="text-black">With Research and online Learning Schools like w3shools, I Learnt About python,C,C# and PhP. I focused more on PhP because it was what I needed more as a Web Developer.</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="timeline-image" data-aos="zoom-out-right"><img width="640" height="360" class="rounded-circle img-fluid" src="assets/img/about/mine/startng.jpg" alt="" /></div>
                    <div class="timeline-panel">
                        <div class="timeline-heading">
                            <h4 data-aos="fade-down-right">2020</h4>
                            <h4 class="subheading" data-aos="zoom-out-right">Transition to Internship Programs</h4>
                        </div>
                        <div class="timeline-body" data-aos="zoom-out-right">
                            <p class="text-black
                            ">I Was Introduced to <b><a style="color: #120172" href="https://start.ng/">StartNg internship</a></b>, where i got exposed to many interns with programming Languages, both on the Design, Mobile, Frontend, Backend, where i had
                                little experience building site from figma. It was wonderfull as I Learnt and focused more on PhP, where i built a Hospital Site. I Made it to the Final Stage But not to the Project Stage.</p>
                        </div>
                    </div>
                </li>
                <li class="timeline-inverted">
                    <div class="timeline-image" data-aos="zoom-out-left">
                        <img width="640" height="360" class="rounded-circle img-fluid" src="assets/img/about/mine/HNG intern1.png" alt="" />
                    </div>
                    <div class="timeline-panel">
                        <div class="timeline-heading">
                            <h4 data-aos="fade-down-left">July 2020</h4>
                            <h4 class="subheading" data-aos="zoom-out-left">Phase Two Expansion</h4>
                        </div>
                        <div class="timeline-body" data-aos="zoom-out-left">
                            <p class="text-black">From StartNg we were Introduced to <b><a style="color: #120172" href="
                                https://hngi7.hng.tech/">HNG</a></b> which was So Competitive and was Sponsored by Google, FlutterWave, Hotels.ng, PiggyVest and many more. I learnt About Many things especially Laravel Framework, Rest API and Android Studio.
                                At HNG I got to connect with many Mentors and understood Tech World Very Well, graduated and got my certificate as a Finalist</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="timeline-image" data-aos="zoom-out-right"><img width="640" height="360" class="rounded-circle img-fluid" src="assets/img/about/mine/wedprof.jpg" alt="" /></div>
                    <div class="timeline-panel">
                        <div class="timeline-heading">
                            <h4 data-aos="fade-down-right">2021-2022</h4>
                            <h4 class="subheading" data-aos="zoom-out-right">Freelancing</h4>
                        </div>
                        <div class="timeline-body" data-aos="zoom-out-right">
                            <p class="text-black">
                                Worked on different remote jobs using my skills and learnt about many things.
                            </p>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="timeline-image" data-aos="zoom-out-right">
                        <img width="640" height="360" class="rounded-circle img-fluid" src="assets/img/about/mine/prof_mine.png" alt="" />
                    </div>
                    <div class="timeline-panel">
                        <div class="timeline-heading">
                            <h4 data-aos="fade-down-right">2022-2025</h4>
                            <h4 class="subheading" data-aos="zoom-out-right">Professional Growth & Backend Specialization</h4>
                        </div>
                        <div class="timeline-body" data-aos="zoom-out-right">
                            <p class="text-black">
                                During this period, I focused heavily on backend engineering, building scalable APIs and real-world financial systems using TypeScript, Node.js, AdonisJS, Express, MongoDB, and Redis. I worked on Open Banking integrations, payment workflows, performance optimization and collaborating with teams to deliver reliable software solutions.
                            </p>
                        </div>
                    </div>
                </li>
                <li class="timeline-inverted">
                    <div style="background-color: #1F1558" class="timeline-image" data-aos="fade-down-right">
                        <h4>
                            The
                            <br /> Story
                            <br /> Continues!
                        </h4>
                    </div>
                </li>
            </ul>
        </div>
    </section>

    <!-- Project Grid-->
    <section style="background-color: #d4cfec" class="page-section" id="Projects">
        <div class="container">
            <div class="text-center">
                <h3 class="section-heading text-uppercase" data-aos="fade-down-left">
                    <span style="color: #15037c; text-decoration:none">P</span>
                    <span style="color: #1900a7; text-decoration:none">R</span>
                    <span style="color: #2a0fc5; text-decoration:none">O</span>
                    <span style="color: #432ad3; text-decoration:none">J</span>
                    <span style="color: #6b54eb; text-decoration:none">E</span>
                    <span style="color: #2a0fc5; text-decoration:none">C</span>
                    <span style="color: #2a0fc5; text-decoration:none">T</span>
                    <span style="color: #2a0fc5; text-decoration:none">S</span>
                </h3>

                <h3 class="section-subheading text-muted" data-aos="fade-up-left">Project I built or Contributed as a Team</h3>
            </div>
            <div class="row" id="projects_section" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                <!-- Loaded from JS -->

            </div>
        </div>
    </section>
    <!-- Services-->
    <section style="background-color: #e9e7f3" class="page-section" id="services">
        <div class="container">
            <div class="text-center">
                <h3 class="section-heading text-uppercase" data-aos="fade-down-right">Capabilities</h3>
                <h4 class="section-subheading text-muted" data-aos="fade-down-right">Things I Can Do</h4>
                <div class="texttypeloop" data-aos="fade-down-right">
                    <p class="section-subheading text-muted">I <span class="typed-text"></span><span class="TypeCursor">&nbsp;</span></p>
                </div>

            </div>
            <br>
            <div class="row text-center">
                <div class="col-md-4">
                    <span class="fa-stack fa-4x" data-aos="fade-down-right">
                        <svg style="color: #725ae9;" class="svg-inline--fa fa-circle fa-w-16 fa-stack-2x" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
                        </svg>

                        <svg class="svg-inline--fa fa-laptop fa-w-20 fa-stack-1x fa-inverse" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="laptop" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
                            <path fill="currentColor" d="M624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z"></path>
                        </svg>
                    </span>
                    <h4 class="my-3" data-aos="fade-down-right">Web Development</h4>
                    <p class="text-muted" data-aos="fade-down-right">
                        I build responsive and user-friendly web applications using modern frontend technologies such as React and Vue. I focus on performance, accessibility, and scalable component architecture, ensuring applications remain maintainable as they grow. I also apply strong problem-solving skills and data-driven thinking to create efficient user experiences.
                    </p>
                </div>
                <div class="col-md-4">
                    <span class="fa-stack fa-4x" data-aos="zoom-out-down">
                        <svg style="color: #725ae9;" class="svg-inline--fa fa-circle fa-w-16 fa-stack-2x" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
                        </svg>

                        <svg class="svg-inline--fa fa-code fa-w-20 fa-stack-1x fa-inverse" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="code" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
                            <path fill="currentColor" d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"></path>
                        </svg>
                    </span>

                    <h4 class="my-3" data-aos="zoom-out-down">Backend Development</h4>
                    <p class="text-muted" data-aos="zoom-out-down">
                        I specialize in designing and building secure, scalable backend systems using Node.js, AdonisJS, Express, and TypeScript. My experience includes REST API development, authentication systems, financial transaction flows, database design, and performance optimization. I am also familiar with PHP (Laravel), MongoDB, Redis, and DevOps practices such as containerization and deployment workflows.
                    </p>

                </div>
                <div class="col-md-4">
                    <span class="fa-stack fa-4x" data-aos="zoom-out-down">
                        <svg style="color: #725ae9;" class="svg-inline--fa fa-circle fa-w-16 fa-stack-2x" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
                        </svg>

                        <svg class="svg-inline--fa fa-users fa-w-20 fa-stack-1x fa-inverse" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
                            <path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path>
                        </svg>
                    </span>
                    <h4 class="my-3" data-aos="zoom-out-down">Collaboration & Teamwork</h4>
                    <p class="text-muted" data-aos="zoom-out-down">
                        I thrive in collaborative environments and value clear communication, accountability, and shared ownership of projects. I have experience coordinating teams, reviewing pull requests, maintaining coding standards, and supporting peers to ensure high-quality deliverables. I enjoy mentoring others and contributing to a positive engineering culture.
                    </p>
                </div>
            </div>
        </div>
    </section>




    <!-- Contact-->
    <section class="page-section" id="contact">
        <div class="container">
            <div class="text-center">
                <h3 class="section-heading text-uppercase">Contact Me</h3>
                <h4 class="section-subheading text-muted">Hey! Let's talk about your next big idea.</h4>
            </div>
            <?php
            $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
            ?>
            <form id="contactForm" action="https://formsubmit.co/pesova13@gmail.com" method="POST">
                <!-- For auto response -->
                <input type="hidden" name="_autoresponse" value="Thank You For Contacting Pesova">

                <input type="hidden" name="_next" value="<?php echo $actual_link . '?contact=sent'; ?>">

                <input type="hidden" name="_captcha" value="false">
                <div class="row align-items-stretch mb-5">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input class="form-control" id="name" name="name" type="text" placeholder="Your Name *" required="required" data-validation-required-message="Please enter your name." />
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="form-group">
                            <input class="form-control" id="email" name="email" type="email" placeholder="Your Email *" required="required" data-validation-required-message="Please enter your email address." />
                            <p class="help-block text-danger"></p>
                        </div>
                        <div class="form-group mb-md-0">
                            <input class="form-control" id="phone" name="phone" type="tel" placeholder="Your Phone *" required="required" data-validation-required-message="Please enter your phone number." />
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group form-group-textarea mb-md-0">
                            <textarea class="form-control" name="message" id="message" placeholder="Your Message *" required="required" data-validation-required-message="Please enter a message."></textarea>
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                </div>
                <div class="text-center">


                    <div id="success"></div>
                    <button style="background-color: #4b34cc; border: none" class="btn btn-info btn-xl text-uppercase" id="sendMessageButton" type="submit">Send Message</button>
                </div>
            </form>
        </div>
    </section>
    <!-- Footer-->
    <footer style="background-color: #ded9f3" class="footer py-4">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-4 text-lg-left">Created by Pesova</div>
                <div class="col-lg-4 my-3 my-lg-0">
                    <a class="btn btn-dark btn-social mx-2" href="https://twitter.com/Pesova2" aria-label="Twitter Profile">
                        <svg class="svg-inline--fa" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                            <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                        </svg>
                    </a>

                    <a class="btn btn-dark btn-social mx-2" href="https://web.facebook.com/osueke.pesova/" aria-label="Facebook Profile">
                        <svg class="svg-inline--fa " aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                            <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                        </svg>
                    </a>

                    <a class="btn btn-dark btn-social mx-2" href="https://www.linkedin.com/in/pesova-osueke-77904b1b1/" aria-label="LinkedIn Profile">
                        <svg class="svg-inline--fa " aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                            <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                        </svg>
                    </a>

                    <a class="btn btn-dark btn-social mx-2" href="https://github.com/pesova" aria-label="Github Profile">
                        <svg class="svg-inline--fa " aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" data-fa-i2svg="">
                            <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </footer>
    <!-- Portfolio Modals-->
    <!-- Modal 1-->
    <div class="portfolio-modal modal fade" id="projectsModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close-modal" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="modal-body">
                                <!-- Project Details Go Here-->
                                <h3 class="text-uppercase" id="project_name"> Project Name</h3>
                                <p class="item-intro text-muted" id="project_description">Project Description</p>
                                <img width="640" height="360" class="img-fluid d-block mx-auto" id="project_image" src="" alt="" />
                                <p id="project_long_description">project long description</p>
                                <ul class="list-inline">
                                    <li id="project_date">Date: Date</li>
                                    <li id="project_client">Client: Project client</li>
                                    <li id="project_category">Category: Project Category</li>
                                </ul>
                                <button class="btn btn-secondary" data-dismiss="modal" type="button">
                                    <i class="fas fa-times mr-1"></i>
                                    Close Project
                                </button>

                                <a class="btn btn-info" target="_blank" rel="noopener" id="project_link" href="/">View Project</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Bootstrap core JS-->

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js"></script>

    <!-- Core theme JS-->
    <script src="js/script.js"></script>
    <script src="js/app.js"></script>

    <!-- AOS -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script type="text/javascript">
        AOS.init({
            once: true,
        });
    </script>
</body>
<?php

if (isset($_GET['contact'])) {
    echo '<script type="text/JavaScript">
          alert("Thank You For Contacting me");
          window.location.href = window.location.pathname;
      </script>';
}

?>

</html>
