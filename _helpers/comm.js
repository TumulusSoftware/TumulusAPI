const nodemailer = require('nodemailer');

async function sendVcode(user) {
	const to = user.emailAsId;
	const subject = "Your verification code with Tumulus";
	const text = `This message is for ${user.firstName} ${user.lastName}.  Please visit the website of Tumulus and use the code of: ${user.vcode}.`;
	await email(to, subject, text);
}

async function notify(user, event, aboutUser) {
	const to = user.emailAsId;
	const subject = event;
	const text = `The event is about ${aboutUser.firstName} ${aboutUser.lastName}.  Please visit the website of Tumulus.`;
	await email(to, subject, text);
}

async function email(to, subject, text) {
	var transporter = nodemailer.createTransport({
		service: process.env.EMAIL_PROVIDER,
		auth: {
			user: process.env.EMAIL_ACCOUNT,
			pass: process.env.EMAIL_PASSWORD
		}
	});

	var mailOptions = {
		from: process.env.EMAIL_FROM,
		to: to,
		subject: subject,
		text: text
	};

	await transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.error(error);
		} else {
			console.log('### Email sent: ' + info.response);
		}
	});
}

module.exports = {
	notify,
	sendVcode
};
 