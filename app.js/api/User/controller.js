let User = require("./model");
let mailer = require("../../config/mailer");

exports.registerNewUser = async (req, res) => {
    try {


        if (req.body.organizer.email) {
            let content =
`BEGIN:VCALENDAR
METHOD:REQUEST
PRODID:Microsoft Exchange Server 2010
VERSION:2.0
BEGIN:VTIMEZONE
TZID:${req.body.timezone}
BEGIN:STANDARD
DTSTART:${req.body.begin}
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=1SU;BYMONTH=11
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:${req.body.begin}
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=2SU;BYMONTH=3
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
ORGANIZER;CN=Kumaran Perinpanatan:mailto:allskarma@hotmail.com
ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${req.body.organizer.name}:mailto:${req.body.organizer.email}
DESCRIPTION;LANGUAGE=en-US:Event Name: ${req.body.description}
UID:040000008200E00074C5B7101A82E0080000000038A598DBF755D701000000000000000
    010000000C40BDF502D6E5A458B012A866185BB20${req.body.stop}
SUMMARY;LANGUAGE=en-US:${req.body.description}
DTSTART;TZID=${req.body.timezone}:${req.body.begin}
DTEND;TZID=${req.body.timezone}:${req.body.stop}
DTSTAMP:${req.body.begin}Z
CLASS:PUBLIC
PRIORITY:5
TRANSP:OPAQUE
STATUS:CONFIRMED
SEQUENCE:0
LOCATION;LANGUAGE=en-US:
X-MICROSOFT-CDO-APPT-SEQUENCE:0
X-MICROSOFT-CDO-OWNERAPPTID:2119563832
X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE
X-MICROSOFT-CDO-INTENDEDSTATUS:BUSY
X-MICROSOFT-CDO-ALLDAYEVENT:FALSE
X-MICROSOFT-CDO-IMPORTANCE:1
X-MICROSOFT-CDO-INSTTYPE:0
X-MICROSOFT-DONOTFORWARDMEETING:FALSE
X-MICROSOFT-DISALLOW-COUNTER:FALSE
X-MICROSOFT-LOCATIONS:[]
BEGIN:VALARM
DESCRIPTION:REMINDER
TRIGGER;RELATED=START:-PT15M
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR
`
const subject = req.body.description

            mailer.welcomeMail(req.body.organizer.email, req.body.organizer.name, content, subject)
            // console.log(content)
        }

        res.status(200).json({
            msg: "Welcome Onboard",
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

/* event controller */
exports.sendEvent = async (req, res) => {
    try {
        const event = {
            username: req.body.username,
            email: req.body.email,
            title: req.body.title,
            address: req.body.address,
            location: req.body.location,
            time: req.body.time,
            date: req.body.date,
            eventFile: req.body.eventFile
        }

        if (event) {

            mailer.welcomeMail(req.body.email, req.body.username)
        }


        res.status(200).json({
            msg: "Welcome ",
            data: addedUser
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}


exports.getAllUsers = async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json({
            msg: "Welcome Onboard",
            data: users
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}