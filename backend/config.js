require('dotenv').config();//instantiate environment variables

CONFIG = {} //Make this global to use all over the application

CONFIG.app          = process.env.APP   || 'dev';
CONFIG.port         = process.env.PORT  || '3001';

CONFIG.db_dialect   = process.env.DB_DIALECT    || 'mysql';
CONFIG.db_host      = process.env.DB_HOST       || 'localhost';
CONFIG.db_port      = process.env.DB_PORT       || '3306';
CONFIG.db_name      = process.env.DB_NAME       || 'testdb';
CONFIG.db_user      = process.env.DB_USER       || 'root';
CONFIG.db_password  = process.env.DB_PASSWORD   || 'password';
CONFIG.FILE_PATH    =  './documents';
CONFIG.ARCHIVED_PATH    =  './documents/archived';

CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'jwt_please_change';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

CONFIG.saml_entryPoint   = process.env.SAML_ENTRYPOINT;
CONFIG.saml_logout_url       = process.env.SAML_LOGOUT_URL;

CONFIG.envURL =  process.env.ENV_URL;

CONFIG.ldapURL   = process.env.LDAP_URL;
CONFIG.ldapUserName       = process.env.LDAP_USERNAME;
CONFIG.ldpaPassword       = process.env.LDAP_PASSWORD;

CONFIG.SnowURL   = process.env.SNOW_URL;
CONFIG.SnowUserName       = process.env.SNOW_USERNAME;
CONFIG.SnowPassword       = process.env.SNOW_PASSWORD;

CONFIG.logRoot     = process.env.LOG_ROOT || 'D://logs'