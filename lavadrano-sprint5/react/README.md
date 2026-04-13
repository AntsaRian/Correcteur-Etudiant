# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



{/* ── Liste des devis ── */}
            <div style={{ marginTop: "3rem" }}>
                <div className="etu-header" style={{ marginBottom: "1.2rem" }}>
                    <div className="etu-header-left">
                        <span className="etu-label">TABLE</span>
                        <h1 className="etu-title">Devis enregistrés</h1>
                    </div>
                </div>

                {loadingDevis ? (
                    <div className="etu-loading">Chargement…</div>
                ) : (
                    <div className="etu-table-wrapper">
                        <table className="etu-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Client</th>
                                    <th>Lieu</th>
                                    <th>Type devis</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allDevis.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-row">Aucun devis trouvé</td>
                                    </tr>
                                ) : allDevis.map((dv, i) => (
                                    <tr key={dv.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                        <td className="cell-id">{dv.id}</td>
                                        <td>{dv.daty}</td>
                                        <td className="cell-nom">
                                            <span className="avatar">
                                                {dv.demande?.client?.nom?.charAt(0).toUpperCase()}
                                            </span>
                                            {dv.demande?.client?.nom}
                                        </td>
                                        <td>{dv.demande?.lieu}</td>
                                        <td>{dv.type_devis?.libelle}</td>
                                        <td className="cell-actions">
                                            <button className="btn-delete"
                                                onClick={() => handleDelete(dv.id)}>
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>