const middleware = require('./detectUserAuth');
const sinon = require('sinon');

describe('detectUserAuth middleware', () => {
  it('if req.session.passport is defined then set req.locals.authUser as true', () => {
    const req = { session: { passport: 'passport' } };
    const res = { render: sinon.spy(), locals: { authUser: false } };
    const next = sinon.spy();
    middleware.detectUserAuth(req, res, next);
    expect(res.locals.authUser).toBe(true);
    expect(next.calledOnce).toBe(true);
  });
});

