import type { CV, CVScan } from "./components/dashboard/ScanResults";

export const dummyCV: CV = {
	id: 2,
	title: "Senior Backend Developer CV",
	file: "/media/uploads/senior_backend_dev.pdf",
	owner_id: 7,
	created: new Date("2024-11-01T10:15:00Z"),
	modified: new Date("2024-11-15T08:30:00Z"),
	cvscan_set: [7],
};

export const dummyCVScan: CVScan = {
	id: 11,
	job_description: `
Build and maintain web applications using Python and the Django framework.
Design and implement backend logic, database models, and user profile systems for community and contributor-focused functionality.
Implement mailing list and newsletter systems that help users stay connected with community activity.
Collaborate with external partners.
Build systems that recognise contributors through profile features and participation tracking, including GitHub and other 3rd party APIs.
Ensure all code is maintainable, secure, and aligned with best Django practices.

Restrictions
- No telecommuting
- No agencies

Requirements
- US resident with full right to work status
- Strong proficiency in Python
- Minimum of 5 years experience with Django (ORM, models, views, templates)
- Experience with relational databases (PostgreSQL or MySQL)
- Frontend familiarity with HTML and CSS
- Experience with lower-level languages is a bonus
- Comfortable working independently in a remote US-based environment

About the Company
- Competitive salary: $120,000 – $150,000
- Health insurance allowance
- Fully remote (US residents only)
- Flexible working hours
- Opportunity to work on open-source and community-focused projects

Contact Info
- Contact: Jon Gould
- Email: hello@foxleytalent.com
- Web: https://foxleytalent.com/jobs/django-developer-usa/
`,
	scan_status: "completed",
	scan_result: `
# CV Soft Skills Analysis

To analyze how well a CV demonstrates the required soft skills, the following structured approach can be used:

---

## 1. Identify the Required Hard Skills

The person to whom the candidate reports agrees that:

- Their contribution to **architecture** and **feature velocity** proceeds at a competitive pace.
- Their **code quality** is on par with top-tier Python developments.

---

## 2. Analyze the Code Snippet

The following code snippet demonstrates the implementation of a secure design in Python using:

- The \`random\` module, which provides a random number generator that can be used to generate unique passwords for authentication.
- The \`git\` library, which provides a Git module that allows you to perform various tasks such as code completion and repository interactions.

This code reflects practices where code quality aligns with top-tier Python development standards.

---

## 3. Evaluate the Code Snippet (Technical Proficiency)

The person who reports has demonstrated:

- High proficiency in one or more required hard skills.
- A contribution to architecture and feature velocity that proceeds at a competitive pace.
- Code quality that is on par with top-tier Python developments.

This highlights that evaluating **multiple hard skills** is important when assessing a candidate's overall value.

---

## 8. Final Observation

Repeated assessments of company fit and contribution levels suggest that while velocity and architectural impact matter, **technical expertise and code quality** remain critical indicators of a candidate’s long-term value.
`,
	overall_match: 60,
	hard_skill_match: 90,
	soft_skill_match: 30,
	experience_level: "Senior",
	cv: dummyCV,
};
