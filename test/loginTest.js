var chai = require('chai'), chaiHttp = require('chai-http');
var alert = require('alert');
const app = require('../app');

require('mocha-sinon');
chai.use(chaiHttp);
var expect = require('chai').expect;

describe ('Login', function() {
    let i = 0
    var testdata = [
        {username: 'owner2',	password: 'owner123', 	profileType: 'owner'},
        {username: 'owner1',	password: 'owner123', 	profileType: 'owner'},
        {username: 'owner3',	password: 'owner123', 	profileType: 'owner'},
        {username: 'owner4',	password: 'owner123', 	profileType: 'owner'},
        {username: 'owner5',	password: 'owner123', 	profileType: 'owner'},
        {username: 'owner6',	password: 'owner123', 	profileType: 'owner'},
        {username: 'owner7',	password: 'owner123', 	profileType: 'owner'},
        {username: 'staff1',	password: 'staff123', 	profileType: 'staff'},
        {username: 'manager1',	password: 'manager123', 	profileType: 'manager'},
        {username: 'admin1',	password: 'admin123', 	profileType: 'admin'},
        {username: 'username1',	password: 'password1', 	profileType: 'admin'},
        {username: 'username2',	password: 'password2', 	profileType: 'owner'},
        {username: 'username3',	password: 'password3', 	profileType: 'manager'},
        {username: 'username4',	password: 'password4', 	profileType: 'staff'},
        {username: 'username5',	password: 'password5', 	profileType: 'admin'},
        {username: 'username6',	password: 'password6', 	profileType: 'owner'},
        {username: 'username7',	password: 'password7', 	profileType: 'manager'},
        {username: 'username8',	password: 'password8', 	profileType: 'staff'},
        {username: 'username9',	password: 'password9', 	profileType: 'admin'},
        {username: 'username10',	password: 'password10', 	profileType: 'owner'},
        {username: 'username11',	password: 'password11', 	profileType: 'manager'},
        {username: 'username12',	password: 'password12', 	profileType: 'staff'},
        {username: 'username13',	password: 'password13', 	profileType: 'admin'},
        {username: 'username14',	password: 'password14', 	profileType: 'owner'},
        {username: 'username15',	password: 'password15', 	profileType: 'manager'},
        {username: 'username16',	password: 'password16', 	profileType: 'staff'},
        {username: 'username17',	password: 'password17', 	profileType: 'admin'},
        {username: 'username18',	password: 'password18', 	profileType: 'owner'},
        {username: 'username19',	password: 'password19', 	profileType: 'manager'},
        {username: 'username20',	password: 'password20', 	profileType: 'staff'},
        {username: 'username21',	password: 'password21', 	profileType: 'admin'},
        {username: 'username22',	password: 'password22', 	profileType: 'owner'},
        {username: 'username23',	password: 'password23', 	profileType: 'manager'},
        {username: 'username24',	password: 'password24', 	profileType: 'staff'},
        {username: 'username25',	password: 'password25', 	profileType: 'admin'},
        {username: 'username26',	password: 'password26', 	profileType: 'owner'},
        {username: 'username27',	password: 'password27', 	profileType: 'manager'},
        {username: 'username28',	password: 'password28', 	profileType: 'staff'},
        {username: 'username29',	password: 'password29', 	profileType: 'admin'},
        {username: 'username30',	password: 'password30', 	profileType: 'owner'},
        {username: 'username31',	password: 'password31', 	profileType: 'manager'},
        {username: 'username32',	password: 'password32', 	profileType: 'staff'},
        {username: 'username33',	password: 'password33', 	profileType: 'admin'},
        {username: 'username34',	password: 'password34', 	profileType: 'owner'},
        {username: 'username35',	password: 'password35', 	profileType: 'manager'},
        {username: 'username36',	password: 'password36', 	profileType: 'staff'},
        {username: 'username37',	password: 'password37', 	profileType: 'admin'},
        {username: 'username38',	password: 'password38', 	profileType: 'owner'},
        {username: 'username39',	password: 'password39', 	profileType: 'manager'},
        {username: 'username40',	password: 'password40', 	profileType: 'staff'},
        {username: 'username41',	password: 'password41', 	profileType: 'staff'},
        {username: 'username42',	password: 'password42', 	profileType: 'admin'},
        {username: 'username43',	password: 'password43', 	profileType: 'owner'},
        {username: 'username44',	password: 'password44', 	profileType: 'manager'},
        {username: 'username45',	password: 'password45', 	profileType: 'staff'},
        {username: 'username46',	password: 'password46', 	profileType: 'admin'},
        {username: 'username47',	password: 'password47', 	profileType: 'owner'},
        {username: 'username48',	password: 'password48', 	profileType: 'manager'},
        {username: 'username49',	password: 'password49', 	profileType: 'staff'},
        {username: 'username50',	password: 'password50', 	profileType: 'admin'},
        {username: 'username51',	password: 'password1', 	profileType: 'owner'},
        {username: 'username52',	password: 'password2', 	profileType: 'manager'},
        {username: 'username53',	password: 'password3', 	profileType: 'staff'},
        {username: 'username54',	password: 'password4', 	profileType: 'admin'},
        {username: 'username55',	password: 'password5', 	profileType: 'owner'},
        {username: 'username56',	password: 'password6', 	profileType: 'manager'},
        {username: 'username57',	password: 'password7', 	profileType: 'staff'},
        {username: 'username58',	password: 'password8', 	profileType: 'admin'},
        {username: 'username59',	password: 'password9', 	profileType: 'owner'},
        {username: 'username60',	password: 'password10', 	profileType: 'manager'},
        {username: 'username61',	password: 'password11', 	profileType: 'staff'},
        {username: 'username62',	password: 'password12', 	profileType: 'admin'},
        {username: 'username63',	password: 'password13', 	profileType: 'owner'},
        {username: 'username64',	password: 'password14', 	profileType: 'manager'},
        {username: 'username65',	password: 'password15', 	profileType: 'staff'},
        {username: 'username66',	password: 'password16', 	profileType: 'admin'},
        {username: 'username67',	password: 'password17', 	profileType: 'owner'},
        {username: 'username68',	password: 'password18', 	profileType: 'manager'},
        {username: 'username69',	password: 'password19', 	profileType: 'staff'},
        {username: 'username70',	password: 'password20', 	profileType: 'admin'},
        {username: 'username71',	password: 'password21', 	profileType: 'owner'},
        {username: 'username72',	password: 'password22', 	profileType: 'manager'},
        {username: 'username73',	password: 'password23', 	profileType: 'staff'},
        {username: 'username74',	password: 'password24', 	profileType: 'admin'},
        {username: 'username75',	password: 'password25', 	profileType: 'owner'},
        {username: 'username76',	password: 'password26', 	profileType: 'manager'},
        {username: 'username77',	password: 'password27', 	profileType: 'staff'},
        {username: 'username78',	password: 'password28', 	profileType: 'admin'},
        {username: 'username79',	password: 'password29', 	profileType: 'owner'},
        {username: 'username80',	password: 'password30', 	profileType: 'manager'},
        {username: 'username81',	password: 'password31', 	profileType: 'staff'},
        {username: 'username82',	password: 'password32', 	profileType: 'admin'},
        {username: 'username83',	password: 'password33', 	profileType: 'owner'},
        {username: 'username84',	password: 'password34', 	profileType: 'manager'},
        {username: 'username85',	password: 'password35', 	profileType: 'staff'},
        {username: 'username86',	password: 'password36', 	profileType: 'admin'},
        {username: 'username87',	password: 'password37', 	profileType: 'owner'},
        {username: 'username88',	password: 'password38', 	profileType: 'manager'},
        {username: 'username89',	password: 'password39', 	profileType: 'staff'},
        {username: 'username90',	password: 'password40', 	profileType: 'admin'},
        {username: 'username91',	password: 'password41', 	profileType: 'owner'},
        {username: 'username92',	password: 'password42', 	profileType: 'manager'},
        {username: 'username93',	password: 'password43', 	profileType: 'staff'},
        {username: 'username94',	password: 'password44', 	profileType: 'admin'},
        {username: 'username95',	password: 'password45', 	profileType: 'owner'},
        {username: 'username96',	password: 'password46', 	profileType: 'manager'},
        {username: 'username97',	password: 'password47', 	profileType: 'staff'},
        {username: 'username98',	password: 'password48', 	profileType: 'admin'},
        {username: 'username99',	password: 'password49', 	profileType: 'owner'},
        {username: 'username100',	password: 'password50', 	profileType: 'manager'}, 
    ];

   function looptest(i) {
    it('Login Test Case ' + i, done => {
        chai.
        request(app)
            .post('/UserInfo')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({username: testdata[i].username, password: testdata[i].password, profileType: testdata[i].profileType})
            .redirects(0)
    .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
    })
    });}
    describe ('Loop', function() {
        for (i = 0; i < testdata.length; i++) {
            looptest(i);
        }
    })
    
});

