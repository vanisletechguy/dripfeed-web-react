import {renderComponent, expect} from '../test_helper';
import {login, LOGIN} from '../../src/actions';

describe('actions', () => {
	describe('login', () => {
		it('should have the correct type', () => {
			const action = login({userName: 'abc', password: '123'})
			expect(action.type).to.equal(LOGIN);
		});
			
		it('should have the correct payload', () => {
			const payload = {userName: 'root', password: 'toor'}
			const action = login(payload);
			expect(action.payload).to.equal(payload);
		});
		it('should return a token when given valid credentials', () => {
					
		});
	});
});
