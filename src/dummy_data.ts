import type { CV, CVScan } from "./components/dashboard/ScanResults";

export const dummyCV: CV = {
	id: 1,
	title: "Senior Backend Developer CV",
	file: "/media/uploads/senior_backend_dev.pdf",
	owner_id: 1,
	created: new Date("2024-11-01T10:15:00Z"),
	modified: new Date("2024-11-15T08:30:00Z"),
	scans: [
		{
			id: 1,
			title: "untitled Scan 1",
			scan_status: "FINISHED",
			created: new Date("2024-11-01T10:15:00Z"),
		},
		{
			id: 2,
			title: "untitled Scan 1",
			scan_status: "FINISHED",
			created: new Date("2024-11-01T10:15:00Z"),
		},
	],
};

export const dummyCVScans: CVScan[] = [
	{
		id: 1,
		title: "untitled Scan 1",
		cv: dummyCV,

		job_description: `
## Backend Developer – Python & Django

We are looking for a **Backend Developer** to design, build, and maintain scalable web applications using **Python** and the **Django framework**.

### Responsibilities
- Develop and maintain backend services using **Django** and **Django REST Framework**
- Design and optimize **database models** and backend business logic
- Build and integrate **REST APIs** for frontend and third-party services
- Work with authentication, user profiles, and role-based access control
- Collaborate with frontend developers, product teams, and external partners
- Write clean, maintainable, and well-tested code following best practices

### Requirements
- Strong proficiency in **Python** and **Django**
- Experience with relational databases (PostgreSQL / MySQL)
- Familiarity with RESTful API design
- Basic understanding of version control systems (Git / GitHub)
- Ability to analyze problems and deliver reliable backend solutions

### Nice to Have
- Experience with **Django REST Framework**
- Exposure to background task processing (Celery / Redis)
- Knowledge of third-party API integrations`,
		scan_status: "STARTED",

		// Text outputs
		scan_result:
			"Strong backend-focused profile with solid Python and Django experience, supported by good problem-solving and collaborative skills.",

		anonymized_cv_text: "",
		preprocessed_cv_text: "",

		// Skills
		identified_hard_skills: {
			extraction_reasoning: "Like I would know",
			found_hard_skills: [
				"Python",
				"Django",
				"Backend Logic",
				"Database Models",
			],
		},

		identified_soft_skills: {
			extraction_reasoning: "Like I would know",
			found_soft_skills: [
				"Problem Solving",
				"Analytical Thinking",
				"Attention to Detail",
				"Collaboration",
				"Communication",
				"Adaptability",
				"Ownership and Accountability",
				"Time Management",
			],
		},

		hard_skill_analyser_output: {
			found_hard_skills: [
				"Python",
				"Django",
				"Backend Logic",
				"Database Models",
			],
			missing_hard_skills: ["React"],
			match_score: 90,
			summary:
				"The CV strongly matches the required backend hard skills, particularly in Python, Django, and backend system design.",
		},

		soft_skill_analyser_output: {
			found_soft_skills: [
				"Problem Solving",
				"Analytical Thinking",
				"Attention to Detail",
				"Collaboration",
				"Communication",
				"Adaptability",
				"Ownership and Accountability",
				"Time Management",
			],
			missing_soft_skills: [
				"Leadership",
				"Mentoring",
				"Stakeholder Communication",
				"Cross-team Collaboration",
			],
			match_score: 65,
			summary:
				"The CV demonstrates solid core soft skills such as problem-solving, analytical thinking, and teamwork. However, leadership, mentoring, and cross-team communication are not clearly evidenced.",
		},

		summary_generator_output: {
			overall_match: 60,
			strengths: [
				"Strong Python and Django expertise",
				"Well-structured backend logic",
				"Experience with database-driven systems",
				"Good problem-solving and analytical approach",
			],
			weaknesses: [
				"Limited evidence of leadership or mentoring experience",
				"Soft skills are mostly implicit rather than explicitly demonstrated",
			],
			recommendations: [
				"Highlight leadership or mentoring responsibilities if applicable",
				"Add examples of cross-team or stakeholder collaboration",
			],
			final_summary:
				"A **technically strong** backend-focused CV with solid Python and Django expertise, complemented by reliable problem-solving and collaboration skills, *though* **leadership** and **broader communication experience** could be more clearly demonstrated.",
		},
	},
	{
		id: 2,
		title: "untitled Scan 2",
		cv: dummyCV,

		job_description: `
## Backend Developer – Python & Django

We are looking for a **Backend Developer** to design, build, and maintain scalable web applications using **Python** and the **Django framework**.

### Responsibilities
- Develop and maintain backend services using **Django** and **Django REST Framework**
- Design and optimize **database models** and backend business logic
- Build and integrate **REST APIs** for frontend and third-party services
- Work with authentication, user profiles, and role-based access control
- Collaborate with frontend developers, product teams, and external partners
- Write clean, maintainable, and well-tested code following best practices

### Requirements
- Strong proficiency in **Python** and **Django**
- Experience with relational databases (PostgreSQL / MySQL)
- Familiarity with RESTful API design
- Basic understanding of version control systems (Git / GitHub)
- Ability to analyze problems and deliver reliable backend solutions

### Nice to Have
- Experience with **Django REST Framework**
- Exposure to background task processing (Celery / Redis)
- Knowledge of third-party API integrations`,
		scan_status: "STARTED",

		// Text outputs
		scan_result:
			"Strong backend-focused profile with solid Python and Django experience, supported by good problem-solving and collaborative skills.",

		anonymized_cv_text: "",
		preprocessed_cv_text: "",

		// Skills
		identified_hard_skills: {
			extraction_reasoning: "Like I would ever know",
			found_hard_skills: [
				"Python",
				"Django",
				"Backend Logic",
				"Database Models",
			],
		},

		identified_soft_skills: {
			extraction_reasoning: "Like I would ever know",
			found_soft_skills: [
				"Problem Solving",
				"Analytical Thinking",
				"Attention to Detail",
				"Collaboration",
				"Communication",
				"Adaptability",
				"Ownership and Accountability",
				"Time Management",
			],
		},

		hard_skill_analyser_output: {
			found_hard_skills: [
				"Python",
				"Django",
				"Backend Logic",
				"Database Models",
			],
			missing_hard_skills: ["React"],
			match_score: 50,
			summary:
				"The CV strongly matches the required backend hard skills, particularly in Python, Django, and backend system design.",
		},

		soft_skill_analyser_output: {
			found_soft_skills: [
				"Problem Solving",
				"Analytical Thinking",
				"Attention to Detail",
				"Collaboration",
				"Communication",
				"Adaptability",
				"Ownership and Accountability",
				"Time Management",
			],
			missing_soft_skills: [
				"Leadership",
				"Mentoring",
				"Stakeholder Communication",
				"Cross-team Collaboration",
			],
			match_score: 55,
			summary:
				"The CV demonstrates solid core soft skills such as problem-solving, analytical thinking, and teamwork. However, leadership, mentoring, and cross-team communication are not clearly evidenced.",
		},

		summary_generator_output: {
			overall_match: 50,
			strengths: [
				"Strong Python and Django expertise",
				"Well-structured backend logic",
				"Experience with database-driven systems",
				"Good problem-solving and analytical approach",
			],
			weaknesses: [
				"Limited evidence of leadership or mentoring experience",
				"Soft skills are mostly implicit rather than explicitly demonstrated",
			],
			recommendations: [
				"Highlight leadership or mentoring responsibilities if applicable",
				"Add examples of cross-team or stakeholder collaboration",
			],
			final_summary:
				"A **technically strong** backend-focused CV with solid Python and Django expertise, complemented by reliable problem-solving and collaboration skills, *though* **leadership** and **broader communication experience** could be more clearly demonstrated.",
		},
	},
];
