import Imap from 'imap';
import { simpleParser } from 'mailparser';

const imap = new Imap({
  user: 'tonemail@example.com',
  password: 'tonmotdepasse',
  host: 'imap.example.com',
  port: 993,
  tls: true,
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function () {
  openInbox(function (err, box) {
    if (err) throw err;
    
    imap.search(['UNSEEN'], function (err, results) {
      if (err) throw err;
      const f = imap.fetch(results, { bodies: ['HEADER.FIELDS (FROM SUBJECT DATE)', 'TEXT'] });
      f.on('message', function (msg, seqno) {
        console.log('Message #%d', seqno);
        const prefix = '(#' + seqno + ') ';

        msg.on('body', function (stream, info) {
          simpleParser(stream, (err, parsed) => {
            if (err) throw err;
            console.log(prefix + 'From:', parsed.from.text);
            console.log(prefix + 'Subject:', parsed.subject);
            console.log(prefix + 'Text:', parsed.text);
          });
        });

        msg.once('end', function () {
          console.log(prefix + 'Finished');
        });
      });

      f.once('end', function () {
        console.log('Done fetching all messages!');
        imap.end();
      });
    });
  });
});

imap.once('error', function (err) {
  console.log(err);
});

imap.once('end', function () {
  console.log('Connection ended');
});

imap.connect();
