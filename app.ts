import express from 'express';
import helmet from 'helmet';

// routers
import authRouter from 'routes/auth';
import testRouter from 'routes/test';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/test', testRouter);

app.listen(8080, () => {
  console.log(`    서버가 시작됐습니만?`);
  console.log(`￣￣￣￣￣ヽ___ノ￣￣￣￣￣￣`);
  console.log(`                Ｏ`);
  console.log(`                 o`);
  console.log(`               ,. ─冖'⌒'─､`);
  console.log(`             ノ             ＼`);
  console.log("            / ,r‐へへく⌒'￢､  ヽ");
  console.log('           {ノ へ._、 ,,／~`  〉 ｝');
  console.log("        ／プ￣￣`y'¨Y´￣￣ヽ─}j=く");
  console.log("      ノ /レ'>ー{___ｭ`ーー'  ﾘ,ｲ}");
  console.log(`     / _勺 ｲ;；∵r===､､∴'∵;   シ`);
  console.log("    ,/ └'ノ ＼  ご`        ノ{ー—､__");
  console.log('   人＿_/ー┬ー个-､＿＿,,.. ‐´ 〃`ァーｧー＼');
  console.log('. /  |／ |::::|､      〃 /:::/ ヽ');
  console.log(` /    |  |::::|＼､_________／ /:::/〃  |`);
});
