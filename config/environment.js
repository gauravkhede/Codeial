
const CODEIAL_SECRET='R0Xx95HZHVV20mci0R7TAhzgp6ZzJSRa'

const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: 'gauravkhede1@gmail.com',
            pass: 'wawpoessbhywpdrc',
        }
    
    },
    google_client_id:'576329952671-l1gn942h6folq74tcpeuqnq9er4o3nds.apps.googleusercontent.com',
    google_client_secret:'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',
    google_call_back_url:'http://localhost:8000/users/auth/google/callback',
    jwt_secret:'codeial',
}


const production={
    name:'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user:process.env.CODEIAL_GMAIL_USERNAME,
            pass:process.env.CODEIAL_GMAIL_PASSWORD,
        }
    
    },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
}


module.exports= eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);