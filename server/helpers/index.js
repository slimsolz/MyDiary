import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Client } from 'pg';
import config from '../config/config';

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const connectionString = config[env];


export default class Helper {
  static encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(password, savedPassword) {
    return bcrypt.compareSync(password, savedPassword);
  }

  static confirmUpdateDate(createdDate, currentDate) {
    return createdDate.toDateString() === currentDate.toDateString();
  }

  static sendMail() {
    const client = new Client(connectionString);
    client.connect();

    const transport = nodemailer.createTransport({
      host: process.env.MY_SERVICE,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD
      }
    });

    const query = {
      text: 'SELECT email FROM users WHERE notification = $1',
      values: [true]
    };

    client.query(query, (err, usersfound) => {
      client.end();
      const users = usersfound.rows.map(email => email.email).join(', ');

      const mailOptions = {
        from: 'MyDiary',
        to: users,
        subject: 'Reminder test',
        html: `<h3 style="grey: white;padding: .5em;">MY DIARY</h3>
        <div style="padding: .5em;">Reminder to add a new entry to your diary</div>
        <p style="padding: .5em;"><b>**Note if you are not subscribed to MyDiary, please ignore this mail.</p>`,
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log(`Message ${info.messageId}, ${info.response}`);
      });
    });
  }
}
