package webservices;

import entities.Logement;
import metiers.LogementBusiness;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/logement")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LogementRessources {
    private LogementBusiness help = new LogementBusiness();

    @GET
    @Path("/getAll")
    public Response getAll() {
        return Response.ok(help.getLogements()).build();
    }

    @GET
    @Path("/{reference}")
    public Response getLogementByReference(@PathParam("reference") int reference) {
        Logement logement = help.getLogementsByReference(reference);
        if (logement != null) {
            return Response.ok(logement).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("{\"message\":\"Logement non trouvé\"}").build();
        }
    }

    @POST
    @Path("/new")
    public Response addLogement(Logement logement) {
        help.addLogement(logement);
        return Response.status(Response.Status.CREATED).entity("{\"message\":\"Logement ajouté avec succès\"}").build();
    }

    @DELETE
    @Path("/delete/{reference}")
    public Response deleteLogement(@PathParam("reference") int reference) {
        boolean isDeleted = help.deleteLogement(reference);
        if (isDeleted) {
            return Response.ok("{\"message\":\"Logement supprimé avec succès\"}").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("{\"message\":\"Logement non trouvé\"}").build();
        }
    }

    @PUT
    @Path("/update/{reference}")
    public Response updateLogement(@PathParam("reference") int reference, Logement logement) {
        boolean isUpdated = help.updateLogement(reference, logement);
        if (isUpdated) {
            return Response.ok("{\"message\":\"Logement mis à jour avec succès\"}").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("{\"message\":\"Logement non trouvé\"}").build();
        }
    }
}
