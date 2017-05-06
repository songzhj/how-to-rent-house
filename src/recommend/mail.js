/**
 * 发送推荐信息的邮件模块
 * @author songzhj
 * @license GPL-3.0
 * @Date    2017-05-04
 */
const nodemailer = require('nodemailer');
const config = require('../../config');
const MAIL_CONFIG = {
    pool: true,
    host: 'smtp.mxhichina.com',
    port: 465,
    secure: true,
    auth: config.SENDER_AUTH
};

class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport(MAIL_CONFIG);
    }

    send(recommendInfo) {
        let htmlTpl = '';
        let emailAddress = '';
        if (Array.isArray(recommendInfo)) {
            for (let i in recommendInfo) {
                htmlTpl += mailTpl(recommendInfo[i]);
            }
            emailAddress = recommendInfo[0].person.email;
        } else {
            htmlTpl =mailTpl(recommendInfo);
            emailAddress = recommendInfo.person.email;
        }
        let mailOptions = {
            from: '"songzhj的房源信息推荐系统" <recommend@songzhj.com>',
            to: emailAddress,
            subject: 'songzhj的房源信息推荐系统-房源来啦',
            text: 'hi~',
            html: htmlTpl
        };
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
}

function mailTpl(recommendInfo) {
    let time = Math.ceil(recommendInfo.duration / 60);
    let htmlTpl = ['<div>',
                   '<b>适合您的房源：</b>',
                   '<a href="http://www.ziroom.com/z/vr/', recommendInfo.house._id,'.html">',
                   recommendInfo.house.title,
                   '</a>',
                   '<b style="margin-left:10px;color:red;">',
                   '价格：',
                   recommendInfo.house.price,
                   '元</b>',
                   '<b style="margin-left:10px;">',
                   '单程用时：',
                   time,
                   '分钟</b>',
                   '</div>'];
    return htmlTpl.join('');
}

module.exports = Mail;