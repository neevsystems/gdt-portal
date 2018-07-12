export  const BASE_URL=window.location.port === "3000" ? 'http://localhost:3001/api/': `${window.location.protocol}//${window.location.host}/api/`;
export  const token='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1Mjg5ODg2ODgsImV4cCI6MTUyODk5ODY4OH0.GOJQqPv50YzCkPxyh-I-QEutPXYKthURabUbOp5Ox8U';

export const dashboardLinks={
    create_instance:'https://gdtdtest.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=3f1dd0320a0a0b99000a53f7604a2ef9',
    dns_change:'https://gdtdtest.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=5c2aebefdb8bd7006dcf38fbfc96196d',
    firewall_role_change:'https://gdtdtest.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=ffa750c3db87d700097b3a0f9d961959',
    temp_access_req:'https://gdtdtest.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=c2f0a073db4fd7006dcf38fbfc9619eb',
    make_other_req:'https://gdtdtest.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=8697f3e7dbcbd7006dcf38fbfc9619a6'
}
