export default function Page({ params }: { 
    params: { 
        username: string 
    } 
}) {
	return (
		<div>
			<h1>Verify {params.username}</h1>
		</div>
	);
}