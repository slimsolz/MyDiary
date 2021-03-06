import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import schedule from 'node-schedule';
import Helper from './helpers/index';
import index from './routes/index';

const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/server/swagger.yaml`);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

const rule = new schedule.RecurrenceRule();
rule.hour = 9;
rule.minute = 0;

const j = schedule.scheduleJob(rule, () => Helper.sendMail());

// port
const port = process.env.PORT || 3000;
app.set('port', port);

// log request to console
app.use(logger('dev'));

// parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', index);
app.use('/', express.static('client'));

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

export default app;
