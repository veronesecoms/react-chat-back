import * as nodemailer from 'nodemailer';

class MailerService {
  public transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'reactchattesting@gmail.com',
      pass: 'react-chat-123'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  public sendEmailConfirmation = async (
    userEmail: string,
    tokenEmail: string
  ) => {
    await this.transporter.sendMail({
      from: 'reactchattesting@gmail.com',
      to: userEmail,
      subject: 'Confirme a criação da sua conta em React Chat',
      text: 'Obrigado por criar uma conta no React Chat.',
      html: `
      <a href="http://localhost:3000/confirmEmail/${tokenEmail}">
        Clique aqui para confirmar a criação da sua conta no React Chat
      </a>`
    });
  };

  public sendEmailRecoveryPassword = async (
    userEmail: string,
    tokenEmail: string
  ) => {
    await this.transporter.sendMail({
      from: 'reactchattesting@gmail.com',
      to: userEmail,
      subject: 'Recupere sua senha em React Chat',
      text: 'Siga as instruções para recuperar sua senha em react chat',
      html: `
      <a href="http://localhost:3000/confirmRecoveryPassword/${tokenEmail}">
        Clique aqui para recuperar sua senha no React Chat
      </a>
      `
    });
  };
}

export default MailerService;
