var nodemailer = require('nodemailer');
var config = require('./utils/configs.json')
module.exports = function(app){
    app.get('/email/fromIndex',function(req,res){
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", " * ");
        var transporter = nodemailer.createTransport({
        //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
        service: 'qq',
        port: 465, // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: {
            user: '407738105@qq.com',
            //这里密码不是qq密码，是你设置的smtp密码
            pass: config.emailKey,
        }
        });

        // NB! No need to recreate the transporter object. You can use
        // the same transporter object for all e-mails

        // setup e-mail data with unicode symbols
        var mailOptions = {
        from: '407738105@qq.com', // 发件地址
        to: '1317426768@qq.com', // 收件列表
        subject: 'Hello sir ! you have a message from your Website', // 标题
        //text和html两者只支持一种
        text: 'Hello You ! ', // 标题
        html: "<h2>"+ req.query.name + "</h2>" + "<p>" + req.query.email   + "</p>" + "<p>" + req.query.message   + "</p>" // html 内容
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
            res.json({
                code:201
            })
        }
        console.log('Message sent: ' + info.response);
            res.json({
                code:200,
            })
        });
        })
}