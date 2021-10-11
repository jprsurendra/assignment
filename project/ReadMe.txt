http://localhost:8000/commonapi/country/?country_name=We

{
    "status": true,
    "status_code": 200,
    "data": [
        {
            "id": 197,
            "country_name": "Sweden"
        },
        {
            "id": 250,
            "country_name": "West Africa"
        },
        {
            "id": 67,
            "country_name": "Western Sahara"
        },
        {
            "id": 249,
            "country_name": "Zimbabwe"
        }
    ]
}





http://localhost:8000/commonapi/city/?country_id=105
{
    "status": true,
    "status_code": 200,
    "data": [
        {
            "id": 29651,
            "country": {
                "id": 105,
                "country_name": "India"
            },
            "city_name": "jaipur"
        },
        {
            "id": 29652,
            "country": {
                "id": 105,
                "country_name": "India"
            },
            "city_name": "jaipur"
        }
    ]
}


http://localhost:8000/candidateapi/candidate/?country_id=105&city_id=29652

{
    "status": true,
    "status_code": 200,
    "data": [
        {
            "id": 1,
            "candidate_name": "Surendra Singh",
            "city": {
                "id": 29652,
                "country": {
                    "id": 105,
                    "country_name": "India"
                },
                "city_name": "jaipur"
            },
            "created_on": "2021-10-11T20:16:39Z",
            "updated_on": "2021-10-11T20:16:42Z",
            "address": "Jaipur",
            "owner_info": "New Company",
            "employee_size": 10
        }
    ]
}

