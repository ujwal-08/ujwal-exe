import type { Project, CategoryId } from './types'

/**
 * PROJECT DATA — single source of truth for the explorer, cards and case studies.
 *
 * Accuracy rules baked into this file:
 *  - No metrics, accuracy figures, user counts or results are listed anywhere.
 *  - Status lists only contain what the project brief supports.
 *  - `links` is empty for every project. Add real, verified URLs under `links`
 *    (e.g. links: { repo: 'https://github.com/...' }) and the buttons appear automatically.
 *  - Before publishing, compare each `status` block with the actual repository.
 */
export const categories: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'software', label: 'Software' },
  { id: 'iot', label: 'IoT / Embedded' },
  { id: 'accessibility', label: 'Accessibility' },
]

export const projects: Project[] = [
  {
    slug: 'solar-flare-forecasting',
    title: 'Solar Flare Forecasting',
    categoryLabel: 'AI / Machine Learning / Space Science',
    categories: ['ai'],
    featured: true,
    statusKind: 'in-progress',
    statusLabel: 'Data pipeline in progress',
    summary:
      'Developing a solar flare forecasting pipeline that combines NOAA flare records with NASA SDO/HMI magnetogram data, using a storage-aware preprocessing workflow and a planned deep-learning model for flare occurrence and class prediction.',
    tech: ['Python', 'SunPy', 'JSOC', 'Supabase', 'PostgreSQL', 'FITS', 'PyTorch', 'ResNet-18 (planned)'],
    visualCaption: 'Abstract illustration of a magnetic field — not observational data.',
    overview:
      'A research and engineering project that pairs NOAA solar flare records with NASA Solar Dynamics Observatory HMI magnetograms, with the goal of predicting flare occurrence and class. At this stage the work is concentrated on building a reliable, storage-aware data pipeline.',
    problem:
      'Flare forecasting needs event labels from flare catalogues matched with large volumes of solar imagery. Retrieving, storing and preparing that imagery is a substantial engineering task before any model can be trained.',
    approach:
      'Use NOAA flare records as event labels, retrieve HMI magnetograms through SunPy with authenticated JSOC access, track metadata in Supabase / PostgreSQL, and convert FITS images into compact 224 × 224 PyTorch tensors. Intermediate data is handled on external NVMe storage. A ResNet-18 model in PyTorch is the planned architecture.',
    flow: [
      { label: 'NOAA flare records', note: 'Event labels' },
      { label: 'JSOC retrieval', note: 'SunPy, authenticated' },
      { label: 'Metadata store', note: 'Supabase / PostgreSQL' },
      { label: 'FITS processing', note: 'External NVMe for intermediates' },
      { label: '224 × 224 tensors', note: 'Compact PyTorch format' },
      { label: 'ResNet-18', note: 'Planned model', planned: true },
    ],
    contribution:
      'Designing and building the data retrieval, metadata management and preprocessing pipeline.',
    status: {
      implemented: [],
      inProgress: [
        'Magnetogram retrieval from JSOC using SunPy',
        'Metadata management with Supabase and PostgreSQL',
        'FITS image processing and conversion to 224 × 224 tensors',
        'Storage-aware workflow using external NVMe storage',
      ],
      planned: [
        'ResNet-18 model in PyTorch for flare occurrence and class prediction',
        'Model training and validation',
      ],
    caveats: [
        'Model training and validation have not been completed.',
        'No forecasting accuracy or evaluation results are claimed.',
      ],
    },
    challenges: [
      {
        title: 'Storage-aware preprocessing',
        body: 'Solar imagery is large. The workflow uses external NVMe storage for intermediate data and reduces images to compact 224 × 224 tensors for the model stage.',
      },
      {
        title: 'Authenticated data access',
        body: 'Magnetograms come from JSOC through authenticated retrieval, so the pipeline has to manage access and keep track of what has been fetched.',
      },
      {
        title: 'Forecasting versus labelling',
        body: "An image aligned to a flare's peak time is not, on its own, a forecast. The planned model setup has to use observations that precede the event.",
      },
    ],
    future: [
      'Complete the data pipeline.',
      'Train and validate the planned ResNet-18 model.',
      'Evaluate flare occurrence and class prediction with a properly designed split.',
    ],
  },
  {
    slug: 'kannada-speech-diagnostic-engine',
    title: 'Kannada Speech Diagnostic Engine',
    categoryLabel: 'AI / Speech Technology',
    categories: ['ai'],
    featured: true,
    statusKind: 'in-progress',
    statusLabel: 'In development',
    achievement: 'Speakathon winner',
    summary:
      'Developing a speech-analysis system focused on speaker diarization, transcription, language handling, and acoustic analysis to support Kannada speech assessment.',
    tech: ['Python', 'FastAPI', 'Speaker diarization', 'Transcription', 'Acoustic analysis'],
    visualCaption: 'Abstract illustration of audio becoming analysis layers — not real output.',
    overview:
      'A speech-analysis system that supports Kannada speech assessment by combining speaker diarization, transcription, language handling and acoustic feature analysis. The project won Speakathon and continues to evolve.',
    problem:
      'Assessing Kannada speech involves separating speakers, transcribing and translating spoken language, and examining acoustic characteristics. Doing this by hand is slow and hard to repeat.',
    approach:
      'A Python / FastAPI service accepts audio through file upload or live microphone recording, then runs it through diarization, transcription and translation workflows where applicable, and acoustic feature analysis.',
    flow: [
      { label: 'Audio input', note: 'Upload or live microphone' },
      { label: 'Speaker diarization', note: 'Who spoke when' },
      { label: 'Transcription', note: 'Kannada, with translation where applicable' },
      { label: 'Acoustic analysis', note: 'Feature extraction' },
    ],
    contribution:
      'Developing the speech-analysis workflow and the FastAPI service around it.',
    status: {
      implemented: [],
      inProgress: [
        'Python and FastAPI service',
        'Audio upload and live microphone recording',
        'Speaker diarization and transcription workflows',
        'Kannada transcription and translation workflows where applicable',
        'Acoustic feature analysis',
      ],
      planned: [],
      caveats: [
        'The project is evolving; capabilities are shown as in development rather than finished.',
        'It has not been clinically validated and is not a medical diagnostic tool.',
        'No claims are made about age or gender detection.',
      ],
    },
    challenges: [
      {
        title: 'Multiple speech tasks in one workflow',
        body: 'Diarization, transcription, language handling and acoustic analysis each have different inputs and failure modes, so they are structured as distinct stages.',
      },
      {
        title: 'Two input paths',
        body: 'Supporting both uploaded files and live microphone recording means audio has to be handled consistently before analysis begins.',
      },
    ],
    future: [
      'Continue refining the analysis stages.',
      'Clearly separate experimental capabilities from stable ones as they mature.',
    ],
  },
  {
    slug: 'smart-braille-reading-system',
    title: 'Smart Braille Reading System',
    categoryLabel: 'Accessibility / Embedded Systems',
    categories: ['accessibility', 'iot'],
    featured: true,
    statusKind: 'prototype',
    statusLabel: 'Prototype in development',
    summary:
      'Developing a smart reading system that combines a Raspberry Pi Zero 2 W, camera-based OCR, and servo-driven tactile output to convert printed text into Grade 1 Braille.',
    tech: ['Raspberry Pi Zero 2 W', 'Tesseract OCR', 'PCA9685', 'Servo motors'],
    visualCaption: 'Schematic illustration of a Braille cell — not a photo of the device.',
    overview:
      'A prototype reading aid that turns printed text into a tactile Braille output. A camera captures text, OCR converts it to characters, and six servo-driven elements form the Braille cell.',
    problem:
      'Printed text is not directly accessible to people who read Braille. A device that converts print into touch-readable output could narrow that gap.',
    approach:
      'Capture text with a camera on a Raspberry Pi Zero 2 W, recognise it with Tesseract OCR, map characters to Grade 1 Braille, and drive six servo-actuated tactile elements through a PCA9685 servo controller.',
    flow: [
      { label: 'Printed text' },
      { label: 'Camera capture', note: 'Raspberry Pi Zero 2 W' },
      { label: 'Tesseract OCR', note: 'Text recognition' },
      { label: 'Grade 1 Braille mapping', note: 'Character → six dots' },
      { label: 'Servo output', note: 'Six elements via PCA9685' },
    ],
    contribution:
      'Developing the OCR-to-Braille software flow and the servo-driven tactile output.',
    status: {
      implemented: [],
      inProgress: [
        'Camera-based text capture',
        'Tesseract OCR',
        'Grade 1 Braille mapping',
        'Six servo-driven tactile elements controlled through a PCA9685',
      ],
      planned: [],
      caveats: [
        'This is a prototype, not a commercially validated assistive device.',
      ],
    },
    challenges: [
      {
        title: 'Physical output from software',
        body: 'Each Braille character has to be translated into the positions of six servo-driven elements, coordinated through a PCA9685 controller.',
      },
      {
        title: 'Constrained hardware',
        body: 'The Raspberry Pi Zero 2 W is small and low-powered, so the capture and OCR flow has to stay lightweight.',
      },
    ],
    future: ['Continue developing and refining the prototype.'],
  },
  {
    slug: 'esp32-nilm-energy-meter',
    title: 'ESP32 NILM Energy Meter',
    categoryLabel: 'IoT / Embedded Systems',
    categories: ['iot'],
    featured: true,
    statusKind: 'prototype',
    statusLabel: 'Prototype built',
    summary:
      'Developed an IoT-based energy monitoring prototype using an ESP32 and electrical sensors to measure voltage and current and explore Non-Intrusive Load Monitoring (NILM) for appliance-level energy consumption.',
    tech: ['ESP32', 'SCT-013-000', 'ZMPT101B', 'EmonLib', 'Embedded web server'],
    visualCaption: 'Illustrative circuit diagram — no live data is connected.',
    overview:
      'An energy monitoring prototype built around an ESP32 that measures voltage and current and explores Non-Intrusive Load Monitoring, which aims to identify appliance-level consumption from a single measurement point.',
    problem:
      'Household energy use is usually seen as one total. Understanding what individual appliances contribute normally needs a sensor on each one.',
    approach:
      'Measure current with an SCT-013-000 sensor and voltage with a ZMPT101B, process readings with EmonLib on an ESP32 Dev Module, and serve a local web interface from the ESP32. The NILM approach is non-AI and does not depend on cloud processing.',
    flow: [
      { label: 'Mains measurement', note: 'SCT-013-000 + ZMPT101B' },
      { label: 'ESP32 Dev Module', note: 'EmonLib processing' },
      { label: 'Local web interface', note: 'Hosted by the ESP32' },
      { label: 'Appliance exploration', note: 'Iron box and electric kettle tests' },
    ],
    contribution:
      'Built the sensing hardware setup and firmware, and the local web interface.',
    status: {
      implemented: [
        'Voltage and current measurement with an ESP32, SCT-013-000 and ZMPT101B',
        'EmonLib-based processing',
        'Local web interface hosted by the ESP32',
        'Prototype appliance tests with an iron box and an electric kettle',
      ],
      inProgress: ['Exploring appliance-level load identification (NILM)'],
      planned: ['Local data storage'],
      caveats: [
        'No measurement accuracy, energy savings or appliance-classification performance is claimed.',
        'The system does not use cloud processing.',
      ],
    },
    challenges: [
      {
        title: 'Two sensors, one picture of power',
        body: 'Combining a current sensor with a voltage sensor is needed to reason about appliance load rather than current alone.',
      },
      {
        title: 'Staying local',
        body: 'Hosting the interface on the ESP32 and avoiding cloud processing keeps the prototype self-contained.',
      },
    ],
    future: ['Add local data storage.', 'Continue exploring appliance-level identification.'],
  },
  {
    slug: 'wandersync-tourism-platform',
    title: 'WanderSync Tourism Platform',
    categoryLabel: 'Full-Stack Web Development',
    categories: ['software'],
    featured: true,
    statusKind: 'developed',
    statusLabel: 'Developed',
    summary:
      'Developed a tourism platform that helps users explore destinations, manage bookings, and access online payment workflows through a web application.',
    tech: ['React', 'Vite', 'Supabase', 'Razorpay (Test Mode)'],
    visualCaption: 'Abstract map-inspired illustration — not a screenshot.',
    overview:
      'A web application for exploring destinations and managing bookings, with a payment workflow integrated through Razorpay in Test Mode.',
    problem:
      'Travellers juggle discovery, booking and payment across separate tools. A single platform can bring these together.',
    approach:
      'A React and Vite front end with Supabase providing backend services and authentication, and a Razorpay Test Mode workflow for payments.',
    flow: [
      { label: 'Destination discovery', note: 'React + Vite interface' },
      { label: 'Authentication', note: 'Supabase' },
      { label: 'Booking management', note: 'Supabase backend' },
      { label: 'Payment workflow', note: 'Razorpay Test Mode' },
    ],
    contribution: 'Built the web application, from the interfaces to the Supabase integration.',
    status: {
      implemented: [
        'Destination and booking interfaces',
        'Supabase backend services and authentication',
        'Razorpay Test Mode payment workflow',
      ],
      inProgress: [],
      planned: [],
      caveats: ['Payments run in Razorpay Test Mode; no live financial transactions are processed.'],
    },
    challenges: [
      {
        title: 'Connecting identity, bookings and payments',
        body: 'Authentication, booking records and the payment flow need to stay consistent with each other.',
      },
    ],
    future: ['Move beyond Test Mode only after proper review of the payment flow.'],
  },
  {
    slug: 'smartshelf-library-management',
    title: 'SmartShelf Library Management System',
    categoryLabel: 'Software Engineering',
    categories: ['software'],
    featured: false,
    statusKind: 'developed',
    statusLabel: 'Developed',
    summary:
      'A library management system built around a C backend and web interface, supporting user access, book management, requests, issued-book records, reviews, and reading tracking.',
    tech: ['C', 'File handling', 'Node.js', 'Express', 'HTML'],
    visualCaption: 'Abstract illustration of organised records — not a screenshot.',
    overview:
      'A library management system whose core logic is written in C, exposed to an HTML frontend through a Node.js / Express API bridge.',
    problem:
      'Libraries need to track books, members, requests and issued items reliably, including who has read what.',
    approach:
      'Implement the core in C using structures, arrays, pointers and file handling for persistent data files, and bridge it to an HTML frontend with a Node.js / Express API.',
    flow: [
      { label: 'HTML frontend' },
      { label: 'Node.js / Express', note: 'API bridge' },
      { label: 'C backend', note: 'Structures, arrays, pointers' },
      { label: 'Data files', note: 'Persistent file handling' },
    ],
    contribution: 'Built the C core, the API bridge and the web interface.',
    status: {
      implemented: [
        'User access',
        'Book management',
        'Requests and issued-book records',
        'Reviews and reading tracking',
      ],
      inProgress: [],
      planned: [],
      caveats: [],
    },
    challenges: [
      {
        title: 'Persistence without a database',
        body: 'Data is stored in files, so the C code has to manage structures and file handling carefully to keep records consistent.',
      },
      {
        title: 'Bridging C and the web',
        body: 'A Node.js / Express layer connects the C backend to a browser frontend.',
      },
    ],
    future: ['Review the file-based storage and consider a database for larger use.'],
  },
  {
    slug: 'medicore-hospital-management',
    title: 'MediCore Hospital Management System',
    categoryLabel: 'Software Engineering / Full-Stack',
    categories: ['software'],
    featured: false,
    statusKind: 'developed',
    statusLabel: 'Developed',
    summary:
      'A hospital management application designed to organize patient records, appointments, admissions, prescriptions, laboratory workflows, beds, billing, and role-based access.',
    tech: ['C', 'Backend API', 'Web frontend', 'Role-based access'],
    visualCaption: 'Abstract clinical-style illustration — not a screenshot.',
    overview:
      'A hospital operations application with C-based core logic, a backend API and a web frontend, organised around role-based workflows.',
    problem:
      'Hospitals coordinate patients, appointments, admissions, prescriptions, laboratory work, beds and billing, often across different roles.',
    approach:
      'Keep the core logic in C, expose it through a backend API, and present role-specific workflows in a web frontend.',
    flow: [
      { label: 'Web frontend', note: 'Role-based views' },
      { label: 'Backend API' },
      { label: 'C core logic' },
    ],
    contribution: 'Designed and built the core logic, API and frontend.',
    status: {
      implemented: [
        'Designed to cover: patient records, appointments, admissions, prescriptions, laboratory workflows, beds, billing and role-based access',
      ],
      inProgress: [],
      planned: [],
      caveats: [
        'It is a software project: no deployment in a real hospital, regulatory compliance or real payment processing is claimed.',
      ],
    },
    challenges: [
      {
        title: 'Many interlinked modules',
        body: 'Patients, admissions, beds, prescriptions and billing all relate to each other, so the data model has to keep them consistent.',
      },
      {
        title: 'Different roles, different views',
        body: 'Role-based access means each user type needs the right workflows and nothing more.',
      },
    ],
    future: ['Verify module coverage against the repository and document it.'],
  },
]

export const getProject = (slug: string | undefined) =>
  projects.find((p) => p.slug === slug)
