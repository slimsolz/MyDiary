import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import schedule from 'node-schedule';
import index from './routes/index';
import Helper from './helpers/index';

const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/server/swagger.yaml`);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const rule = new schedule.RecurrenceRule();
rule.minute = 10;

const j = schedule.scheduleJob(rule, () => Helper.sendMail());

app.use(cors());

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
