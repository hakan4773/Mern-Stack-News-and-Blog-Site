const Contact = require("../Models/Contact");

exports.Contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const user = await Contact.create({
      name,
      email,
    message,
    });
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Mesaj gönderimi başarısız" });
  }
};

exports.getContact=async(req,res)=>{
  try {
      const contact=await Contact.find().sort("-createdAt");
      res.status(201).json({ contact }); 
  } catch (error) {
       res.status(401).json({ message: "Hata oluştu", error: error.message });
  }
  }



// exports.sendEmail = async (req, res) => {
//   try {
//     const outputMessage = `
// <h1>Mail Details </h1>
// <ul>
// <li>Name:${req.body.name}</li>
// <li>Email:${req.body.email}</li>

// <h1>Messsage</h1>
// <p>${req.body.message}</p>
// </ul>
// `;
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true, 
//       auth: {
//         user: 'frontend@gmail.com',
//         pass: process.env.MAIL_PASSWORD,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: '"Smart Edu Contact Form :" <frontend@gmail.com>',
//       to: 'mail.to@gmail.com', 
//       subject: 'Smart Edu Contact Form', 
//       html: outputMessage, 
//     });

//     console.log('Message sent: %s', info.messageId);

//     res.status(200).redirect('contact');
//   } catch (error) {

//     res.status(200).redirect('contact');
//   }
// };
