import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentInfo = () => {
	let navigate = useNavigate();

	return (
		<div>
			<div className="container">
				<div className="row justify-content-between">
					<div className="col-2 align-self-between">
						<h4>
							<b>Fake Store Catalogue</b>
						</h4>
					</div>
					<div className="col-md-auto col-md-4 align-self-center"></div>
					<div className="col-lg-4 align-self-center">
						<button
							type="button"
							className="btn btn-md btn-primary m-1"
							onClick={() => navigate('/additem')}
						>
							Add Songs
						</button>
						<button
							type="button"
							className="btn btn-md btn-primary m-1"
							onClick={() => navigate('/updateitem')}
						>
							Update Item
						</button>
						<button
							type="button"
							className="btn btn-md btn-primary"
							onClick={() => navigate('/delete')}
						>
							Delete Item
						</button>
						<button
							type="button"
							className="btn btn-md btn-primary"
							onClick={() => navigate('/')}
						>
							Return
						</button>
					</div>
				</div>
			</div>
			<div className="album py-5 bg-light">
				<div className="container">
					<div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 row-lg-12">
						<h1>Meet the Authors:</h1>
						<br />

						<section id="about">
							<div className="container">
								<h1>Shivansh Patel</h1>
								<p
									style={{
										fontFamily: 'Courier New, Courier, monospace',
										color: 'brown',
									}}
								>
									Computer Engineering Student
								</p>
								<p>
									I am a student at Iowa State University. This semester Spring
									2024 I am taking SE/ComS319. This is a course on web
									development, and I really like snowboarding! You can reach me
									at shivansh@iastate.edu
								</p>
							</div>
						</section>

						<br />
						<section id="about">
							<div className="container">
								<h1>Luke Munn</h1>
								<p
									style={{
										fontFamily: 'Courier New, Courier, monospace',
										color: 'brown',
									}}
								>
									Computer Science Student
								</p>
								<p>
									Hey! I am Luke and I love skiing. I am currently taking com s
									319 at Iowa State University. If you want to reach me at
									lmunn64@iastate.edu
								</p>
							</div>
						</section>

						<br />
						<section id="about">
							<div className="container">
								<h1>Com S 319</h1>
								<p
									style={{
										fontFamily: 'Courier New, Courier, monospace',
										color: 'brown',
									}}
								>
									Ali Jannesari
								</p>
								<p>2/8/24</p>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentInfo;
