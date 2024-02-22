import React from 'react';

interface ITeamMember {
	id: number;
	imgUrl: string;
	memberName: string;
	memberPostion: string;
}

const TeamMember: React.FC<ITeamMember> = ({
	imgUrl,
	memberName,
	memberPostion,
}) => {
	return (
		<div className="teamMember">
			<img src={imgUrl} alt="" />
			<h3>{memberName}</h3>
			<h4>{memberPostion}</h4>
		</div>
	);
};

export default TeamMember;
