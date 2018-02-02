import { Http, MVC } from 'stackerjs';


export class RoutesManagerController extends MVC.Controller
{

    public routes()
    {
        return {
            'get': {
                '/route': 'listRoutesAction'
            },
            'post': {
                '/route': 'addRouteAction'
            }
        }
    }

    public listRoutesAction(request:Http.Request)
    {

    }

}