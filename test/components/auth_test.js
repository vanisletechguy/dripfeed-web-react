import {renderComponent, expect} from '../test_helper';
import Auth from '../../src/components/auth';

describe('Auth Component', () => {
	let component;

	beforeEach(() => {
		component = renderComponent(Auth);
	});

	it('renders something',() => {
		expect(component).to.exist;
	});

	it('allows user to submit userName and password', () => {
	});



});
